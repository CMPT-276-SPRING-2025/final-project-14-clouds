import "../../styling/BalancePanel.css";
import { useEffect, useState } from "react";

function BalancePanel2() {
  const [checkings, setCheckings] = useState(0);
  const [savings, setSavings] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  async function connectEndPoint() {
    const accountBalances = await fetch(
      `${import.meta.env.VITE_API_URL}/getBalance`
    );
    const accountBalances2 = await accountBalances.json();

    setCheckings(accountBalances2.checkingAmount);
    setSavings(accountBalances2.savingAmount);
    setLoading(false);
  }

  useEffect(() => {
    async function fetchData() {
      await connectEndPoint();
    }
    fetchData();
  }, []);

  useEffect(() => {
    setTotal(checkings + savings);
  }, [checkings, savings]);

  if (loading) {
    return (
      <div className="panel">
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h2 className="balance-title">Your Balance</h2>
      <hr className="divider" />

      <div className="balance-container">
        <p className="total-balance">${total.toFixed(2)}</p>

        <div className="balance-column">
          <p>
            <span className="label">Chequing:</span> 
            <span className="amount">${checkings.toFixed(2)}</span>
          </p>
      
          <p>
            <span className="label">Savings:</span> 
            <span className="amount">${savings.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BalancePanel2;
