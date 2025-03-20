import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../styling/Removal-906.png";
import "../styling/menu.css";

function Analytics() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [transactions, setTransactions] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Transactions:", data);
        setTransactions(data);
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      calculateMonthlySpending(transactions, year, month);
    }
  }, [year, month, transactions]);

  function calculateMonthlySpending(transactions, selectedYear, selectedMonth) {
    const filtered = transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      return txnDate.getFullYear() === selectedYear && txnDate.getMonth() + 1 === selectedMonth;
    });

    const total = filtered.reduce((sum, txn) => sum + txn.amount, 0);
    setTotalSpent(total.toFixed(2));
  }

  function handlePrevMonth() {
    setMonth((prev) => (prev === 1 ? 12 : prev - 1));
    if (month === 1) setYear((prev) => prev - 1);
  }

  function handleNextMonth() {
    setMonth((prev) => (prev === 12 ? 1 : prev + 1));
    if (month === 12) setYear((prev) => prev + 1);
  }

  function getMonthName(m) {
    return new Date(year, m - 1).toLocaleString("default", { month: "long" });
  }

  return (
    <>
      <div className="nav"></div>
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

      {/* Analytics Panel */}
      <div className="analytics-panel">
        <h3>Monthly Transactions</h3>
        <p>Total spent in {getMonthName(month)} {year}: <strong>${totalSpent}</strong></p>

        <button onClick={handlePrevMonth}>← Previous</button>
        <button onClick={handleNextMonth}>Next →</button>
      </div>

      <div className="activity-panel">
        <h2>Recent Transactions</h2>
        {transactions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount ($)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
            {transactions
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 4)
              .map((txn, index) => (
                <tr key={index}>
                  <td>{txn.category}</td>
                  <td className={txn.amount >= 0 ? "amount-positive" : "amount-negative"}>
                    {txn.amount >= 0 ? `+${txn.amount.toFixed(2)}` : `-${Math.abs(txn.amount).toFixed(2)}`}
                  </td>
                  <td>{new Date(txn.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading transactions...</p>
        )}
      </div>
    </>
  );
}

export default Analytics;