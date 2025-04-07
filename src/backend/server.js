import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

//Allow frontend requests
app.use(cors({
    origin: "https://final-project-14-clouds-1.onrender.com",
    methods: "GET,POST",
    credentials: true,
}));
// before pushing change the origin so it's just render.com

const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.CLIENT_ID;
const SECRET_PLAID_KEY = process.env.SECRET_PLAID_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

//Utility function for API requests
async function fetchFromPlaid(url, body) {
    try {
        const fetch = (await import("node-fetch")).default;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data;
    } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        return null;
    }
}

//Generate Public Token
async function genPublicToken() {
    return await fetchFromPlaid("https://sandbox.plaid.com/sandbox/public_token/create", {
        client_id: CLIENT_ID,
        secret: SECRET_PLAID_KEY,
        institution_id: "ins_109508",
        initial_products: ["transactions"],
    });
}

//Generate Access Token from Public Token
async function genAccessToken(publicToken) {
    return await fetchFromPlaid("https://sandbox.plaid.com/item/public_token/exchange", {
        client_id: CLIENT_ID,
        secret: SECRET_PLAID_KEY,
        public_token: publicToken,
    });
}

//Fetch Account Balances
async function genBalance(accessToken) {
    return await fetchFromPlaid("https://sandbox.plaid.com/accounts/balance/get", {
        client_id: CLIENT_ID,
        secret: SECRET_PLAID_KEY,
        access_token: accessToken,
    });
}

//Fetch Transactions
async function genTransactions(accessToken) {
    const today= new Date();
    const lastMonth= new Date();
    lastMonth.setMonth(today.getMonth()-1);

    const formatDate=(date)=>date.toISOString().split("T")[0];

    const start_date =formatDate(lastMonth);
    const end_date =formatDate(today);

    return await fetchFromPlaid("https://sandbox.plaid.com/transactions/get", {
        client_id: CLIENT_ID,
        secret: SECRET_PLAID_KEY,
        access_token: accessToken,
        start_date: start_date,
        end_date:  end_date,
        options: { count: 100 }, // Fetch last 50 transactions
    });
}

//Initialize API tokens
export let accessToken;

export function setAccessToken(token) {
    accessToken = token;
}

if (process.env.NODE_ENV !== "test") {
    (async function initializeTokens() {
        try {
            const publicData = await genPublicToken();
            if (!publicData?.public_token) throw new Error("Failed to generate public token");

            const accessData = await genAccessToken(publicData.public_token);
            if (!accessData?.access_token) throw new Error("Failed to generate access token");

            accessToken = accessData.access_token;
            console.log("Access token initialized successfully");
        } catch (error) {
            console.error("Token Initialization Failed:", error);
        }
    })();
}


//Testing Gemini API response
async function geminiResponse(question){



    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents:[
                {
                    parts:[
                        {
                            text:  question + ". please answer this in no more than 3 sentences" + "Here are"
                        }
                    ]
                }
            ]
        })
    }     
    );

     
    return response;
}





//Route: Get Account Balances
app.get("/getBalance", async (req, res) => {
    if (!accessToken) return res.status(500).json({ error: "Access token not initialized" });

    const balanceData = await genBalance(accessToken);
    if (!balanceData?.accounts) {
        console.error("No accounts found:", balanceData);
        return res.status(500).json({ error: "Failed to fetch balance data from Plaid" });
    }


    // Filter Checking & Savings Accounts
    const accounts = balanceData.accounts.filter(acc =>
        acc.subtype === "checking" || acc.subtype === "savings"
    );

    if (accounts.length < 2) {
        return res.status(500).json({ error: "Not enough account data available" });
    }

    res.json({
        checkingAmount: accounts[0]?.balances?.current || 0,
        savingAmount: accounts[1]?.balances?.current || 0,
    });

});

// Route: Get Transactions
app.get("/getTransactions", async (req, res) => {
    if (!accessToken) return res.status(500).json({ error: "Access token not initialized" });

    const transactionsData = await genTransactions(accessToken);
    if (!transactionsData?.transactions) {
        console.error("No transactions found:", transactionsData);
        return res.status(500).json({ error: "Failed to fetch transactions from Plaid" });
    }

    res.json({ transactions: transactionsData.transactions });
});

//Route: Test Gemini API Route
app.post("/getAnswer", async (req,res) =>{

    try{
        

        const question = req.body.question; 
        const data = await geminiResponse(question);
        const json = await data.json();
        res.json({
            answer: json.candidates[0].content.parts[0].text

        })
    }

    catch(error){
        console.log(error);
        res.json({
            error: "Error failed to fetch answer from Gemini"
        })
    }
    
});


// Only start server if not in test mode
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Export app and utility functions for testing
export default app;

export {
    fetchFromPlaid,
    genPublicToken,
    genAccessToken,
    genBalance,
    genTransactions,
    geminiResponse
};