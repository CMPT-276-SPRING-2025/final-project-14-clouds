import "../../styling/transactionPanel.css";
import { useEffect, useState } from "react";

function TransactionsPanel() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); 
  async function connectEndPoint() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getTransactions`);
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const transactionData = await response.json();
      setTransactions(transactionData.transactions);
      setFilteredTransactions(transactionData.transactions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await connectEndPoint();
    }
    fetchData();
  }, []);

  // Filter transactions when filter changes
  useEffect(() => {
    if (filter === "Earnings") {
      setFilteredTransactions(transactions.filter((tx) => tx.amount > 0));
    } else if (filter === "Expenditure") {
      setFilteredTransactions(transactions.filter((tx) => tx.amount < 0));
    } else {
      setFilteredTransactions(transactions);
    }
  }, [filter, transactions]);

  return (
    <div className="panel transactions-panel">
      <div className="transactions-header">
        <h2>Account Activity</h2>
        <select className="filter-dropdown" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Transactions</option>
          <option value="Earnings">Earnings</option>
          <option value="Expenditure">Expenditure</option>
        </select>
      </div>

      {/*Show Loading Spinner */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading transactions...</p>
        </div>
      )}

      {/*Show Error Message */}
      {error && (
        <div className="error-container">
          <p className="error-text">Error: {error}</p>
        </div>
      )}

      {/*Show No Transactions Message */}
      {!loading && !error && filteredTransactions.length === 0 && (
        <p className="no-transactions">No transactions available.</p>
      )}

      {/*Show Transactions Table */}
      {!loading && !error && filteredTransactions.length > 0 && (
        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
            <tr>
              <th>Merchant</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
            </thead>
      <tbody>
        {filteredTransactions.map((tx, index) => (
          <tr key={index}>
            <td>{tx.merchant_name || tx.name || "Unknown Merchant"}</td>
            <td className={tx.amount < 0 ? "negative" : "positive"}>
              {tx.amount < 0 ? `-$${Math.abs(tx.amount).toFixed(2)}` : `+$${tx.amount.toFixed(2)}`}
              </td>
            <td>{new Date(tx.date).toLocaleDateString()}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
)}

    </div>
  );
}

export default TransactionsPanel;
