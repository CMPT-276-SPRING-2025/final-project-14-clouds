import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../styling/Removal-906.png";
import "../styling/menu.css";

function Analytics() {
  // get current date info for default month/year
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());    
  const [month, setMonth] = useState(today.getMonth() + 1);  
  const [transactions, setTransactions] = useState([]);      
  const [totalSpent, setTotalSpent] = useState(0);           

  // fetch transactions from backend once on mount
  useEffect(() => {
    fetch("http://localhost:5000/getTransactions")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Transactions:", data);
        setTransactions(data.transactions); // assumes { transactions: [...] }
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  // recalculate monthly spending when year/month/transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      calculateMonthlySpending(transactions, year, month);
    }
  }, [year, month, transactions]);

  /**
   * filters and totals up all transactions for selected month/year
    @param {Array} transactions 
    @param {number} selectedYear 
    @param {number} selectedMonth 
   */
  function calculateMonthlySpending(transactions, selectedYear, selectedMonth) {
    const filtered = transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      return txnDate.getFullYear() === selectedYear && txnDate.getMonth() + 1 === selectedMonth;
    });

    // sum all transaction amounts for the month
    const total = filtered.reduce((sum, txn) => sum + txn.amount, 0);
    setTotalSpent(total.toFixed(2));
  }

  // navigate to previous month, update year if needed
  function handlePrevMonth() {
    setMonth((prev) => (prev === 1 ? 12 : prev - 1));
    if (month === 1) setYear((prev) => prev - 1);
  }

  // navigate to next month, update year if needed
  function handleNextMonth() {
    setMonth((prev) => (prev === 12 ? 1 : prev + 1));
    if (month === 12) setYear((prev) => prev + 1);
  }

  /**
   * returns full name of month
   * @param {number} m
   * @returns {string} 
   */
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

      {/* displays current month’s total spending and buttons to change month */}
      <div className="analytics-panel">
        <h3>Monthly Transactions</h3>
        <p>Total spent in {getMonthName(month)} {year}: <strong>${totalSpent}</strong></p>

        <button onClick={handlePrevMonth}>← Previous</button>
        <button onClick={handleNextMonth}>Next →</button>
      </div>

      {/* shows 4 most recent transactions in a table */}
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
                      {txn.amount >= 0
                        ? `+${txn.amount.toFixed(2)}`
                        : `-${Math.abs(txn.amount).toFixed(2)}`}
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