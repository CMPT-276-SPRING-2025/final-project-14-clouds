import "../../styling/transactionPanel.css";
import { useEffect, useState } from "react";

function TransactionsPanel() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function connectEndPoint() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getTransactions`);
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const transactionData = await response.json();
      setTransactions(transactionData.transactions);
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

  return (
    <div className="panel transactions-panel">
      <h2>Recent Transactions</h2>

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
      {!loading && !error && transactions.length === 0 && (
        <p className="no-transactions">No transactions available.</p>
      )}

      {/*Show Transactions Table */}
      {!loading && !error && transactions.length > 0 && (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Merchant</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
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
      )}
    </div>
  );
}

export default TransactionsPanel;
