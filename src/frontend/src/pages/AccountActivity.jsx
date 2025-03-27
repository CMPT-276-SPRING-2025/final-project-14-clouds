import { useEffect, useState } from "react";
import "../styling/menu.css";
import { Link } from "react-router-dom";
import Logo from "../styling/Removal-906.png";

function AccountActivity() {
  // state to store list of transactions
  const [transactions, setTransactions] = useState([]);

  // state for income and expenses
  const [cashIn, setCashIn] = useState(0);
  const [cashOut, setCashOut] = useState(0);

  // fetch transactions when component loads
  useEffect(() => {
    fetch("http://localhost:5000/getTransactions")
      .then(res => res.json())
      .then(data => {
        const txns = data.transactions || [];
        setTransactions(txns.slice(0, 5)); 
        calculateCashFlow(txns);
      })
      .catch(err => console.error("error fetching transactions:", err));
  }, []);

  // calculates total income and expenses from transactions
  function calculateCashFlow(txns) {
    let inTotal = 0;
    let outTotal = 0;

    for (const txn of txns) {
      if (txn.amount > 0) inTotal += txn.amount;
      else outTotal += txn.amount;
    }

    setCashIn(inTotal);
    setCashOut(outTotal);
  }

  return (
    <>
      {/* top nav */}
      <div className="nav"></div>

      {/* left sidebar */}
      <nav className="menu">
        <ul>
          <li><img src={Logo} alt="profile logo" className="logo" /></li>
          <li><Link to="/Dashboard">Dashboard</Link></li>
          <li><Link to="/AccountActivity">Account Activity</Link></li>
          <li><Link to="/Goals">My Goals</Link></li>
          <li><Link to="/Analytics">Analytics</Link></li>
          <li><Link to="/Advice">Advice</Link></li>
        </ul>
      </nav>

      {/* summary of income, expense, and net */}
      <div className="overview-panel">
        <h3>Overview</h3>
        <p className="overview-label">Last Month</p>
        <p className="overview-in">Cash In: ${cashIn.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        <p className="overview-out">Cash Out: ${Math.abs(cashOut).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        <p className="overview-net">Earnings: ${(cashIn + cashOut).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
      </div>
    </>
  );
}

export default AccountActivity;