//dummy file
import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();


const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.CLIENT_ID;
const SECRET_PLAID_KEY = process.env.SECRET_PLAID_KEY;



async function genPublicToken(){

    try{
        const fetch = (await import("node-fetch")).default;

        const response = await fetch("https://sandbox.plaid.com/sandbox/public_token/create",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    client_id: CLIENT_ID,
                    secret: SECRET_PLAID_KEY,
                    institution_id: "ins_109508",
                    initial_products: ["liabilities","statements","transactions","transfer"],
                    options:{
                        statements: {start_date:"2024-01-01", end_date:"2025-03-17"},
                        transactions: {start_date:"2024-01-01", end_date:"2025-03-17"}

                    }
                })
        });
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log("Failed to create public token because of: ", error);
    } 
    
}

const publicData = await genPublicToken();
const publicToken = publicData.public_token;

async function genAccessToken(){

    try{
        const fetch = (await import("node-fetch")).default;

        const response = await fetch("https://sandbox.plaid.com/item/public_token/exchange",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    client_id: CLIENT_ID,
                    secret: SECRET_PLAID_KEY,
                    public_token: publicToken
                })
        });
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log("Failed to create access token because of: ", error);
    } 
    
}

const accessData = await genAccessToken();
const accessToken = accessData.access_token;

async function genBalance(){

    try{
        const fetch = (await import("node-fetch")).default;

        const response = await fetch("https://sandbox.plaid.com/accounts/balance/get",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    client_id: CLIENT_ID,
                    secret: SECRET_PLAID_KEY,
                    access_token: accessToken,
                    options:{account_ids: null}
                })
        });
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log("Failed to get total balance becaue of: ", error);
    } 
    
}




app.use(cors({
    origin:`http://localhost:${process.env.ORIGIN}`,
    methods:"GET,POST",
    credentials: true,
}));

app.get("/api/transactions", (req, res) => {
    const transactions = [
        { date: "2024-03-18", category: "Food", amount: 12.99 },
        { date: "2024-03-17", category: "Transport", amount: 5.50 },
        { date: "2024-03-16", category: "Shopping", amount: 34.99 },
        { date: "2024-03-15", category: "Entertainment", amount: 15.00 }
    ];
    res.json(transactions);
});

app.get("/getBalance",async(req,res) => {
    console.log("hi");
    const Balance =  await genBalance();
    
    const accounts = Balance.accounts;
    console.log(accounts);
    const reqAccounts = accounts.filter((account)=>
        account.subtype === "checking" || account.subtype ==="savings"
    );

    res.json(
        {
            checkingAmount:reqAccounts[0].balances.current,
            savingAmount:reqAccounts[1].balances.current
        
        }
        
        );
   
});

app.get("/test",(req,res) => {
    res.json({
        name: "Harry",
        age: 65,
        nationality: "British"


    });
});

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);
});