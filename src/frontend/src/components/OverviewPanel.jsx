import "../styling/OverviewPanel.css";
import { useEffect, useState } from "react";


function OverviewPanel(){
    const [earnings, setEarnings]=useState(0);
    const [expenses, setExpenses]=useState(0);
    const [net, setNet]=useState(0);
    const [loading, setLoading]= useState(true);
    const [error, setError]=useState(null);

    useEffect(()=>{
        async function fetchTransactions(){
            try{
                const response= await fetch(`${import.meta.env.VITE_API_URL}/getTransactions`);
                if(!response.ok){
                    throw new Error("failed to fetch transactions");
                }
                const data= await response.json();
                const transactions= data.transactions;
                
                const cashIn = transactions
                .filter((tx)=>tx.amount>0)
                .reduce((acc,tx)=>acc+tx.amount,0);

                const cashOut=transactions
                .filter((tx)=>tx.amount<0)
                .reduce((acc,tx)=>acc+tx.amount,0);

                setEarnings(cashIn);
                setExpenses(Math.abs(cashOut));
                setNet(cashIn+cashOut);
            } catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }
        fetchTransactions(); 
    },[]);
    if (loading) {
        return <div className="overview-panel">Loading overview...</div>;
    }
    
    if (error) {
        return <div className="overview-panel">Error: {error}</div>;
    }
    return (
        <div className="overview-panel">
      <h3>Overview</h3>
      <div className="overview-item">
        <span>Earnings (Cash In):</span>
        <span className="positive">+${earnings.toFixed(2)}</span>
      </div>
      <div className="overview-item">
        <span>Expenditures (Cash Out):</span>
        <span className="negative">-${expenses.toFixed(2)}</span>
      </div>
      <div className="overview-item total">
        <span>Net Profit:</span>
        <span className={net >= 0 ? "positive" : "negative"}>
          {net >= 0 ? "+" : "-"}${Math.abs(net).toFixed(2)}
        </span>
      </div>
    </div>
    );
}

export default OverviewPanel;