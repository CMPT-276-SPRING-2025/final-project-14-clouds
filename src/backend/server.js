//dummy file
require('dotenv').config();
const express = require ('express');
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




app.get("/",async(req,res) => {
    console.log("hi");
    const data = await genPublicToken();
    res.json(data);
    
    
   
});

app.get("/test",(req,res) => {
    res.json({
        name: "Harry",
        age: 65,
        nationality: "British"


    });
});

app.listen(PORT, () =>{
    console.log(`Server is listengin on port ${PORT}`);
});

