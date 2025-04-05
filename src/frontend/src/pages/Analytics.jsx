import "../styling/Analytics.css";
import MenuPanel from "../components/MenuPanel";
import { useEffect, useState } from "react";

// Category selection panel with arrow buttons
function CategorySelector({ categories, currentIndex, onPrev, onNext }) {
  return (
    <div className="category-selector-box">
      <div className="category-selector-inner">
        <button className="arrow-button" onClick={onPrev}>{"<"}</button>
        <h3>{categories[currentIndex].replace(/_/g, " ")}</h3>
        <button className="arrow-button" onClick={onNext}>{">"}</button>
      </div>
    </div>
  );
}

// Month selection panel with arrow buttons
function MonthSelector({ month, year, onPrev, onNext }) {
  const monthName = new Date(year, month - 1).toLocaleString("default", { month: "long" });
  return (
    <div className="month-selector-box">
      <div className="month-selector-inner">
        <button className="arrow-button" onClick={onPrev}>{"<"}</button>
        <div className="month-label">{monthName} {year}</div>
        <button className="arrow-button" onClick={onNext}>{">"}</button>
      </div>
    </div>
  );
}

function Analytics() {
  // Transaction data and UI state
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  // Defined categories for filtering
  const categories = [
    "ALL",
    "TRAVEL",
    "TRANSPORTATION",
    "FOOD_AND_DRINK",
    "ENTERTAINMENT",
    "GENERAL_MERCHANDISE",
    "LOAN_PAYMENTS",
    "PERSONAL_CARE",
    "GENERAL_SERVICES",
    "INCOME"
  ];

  // Fetch transaction data once on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getTransactions`);
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const transactionData = await response.json();
        setTransactions(transactionData.transactions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter by category if not ALL
  const selectedCategory = categories[categoryIndex];
  const filteredByCategory = selectedCategory === "ALL"
    ? transactions
    : transactions.filter(tx => tx.personal_finance_category?.primary === selectedCategory);

  // Filter transactions to only include selected month/year
  const filteredByMonth = filteredByCategory.filter(tx => {
    const date = new Date(tx.date);
    return date.getFullYear() === year && date.getMonth() + 1 === month;
  });

  // Compute total amount for current filter
  const total = filteredByMonth.reduce((sum, tx) => sum + tx.amount, 0);

  // Show all recent transactions
  const recentTransactions = filteredByMonth;

  // Go to previous category in list
  const handlePrevCategory = () => {
    setCategoryIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  // Go to next category in list
  const handleNextCategory = () => {
    setCategoryIndex((prev) => (prev + 1) % categories.length);
  };

  // Decrement month, and year if necessary
  const handlePrevMonth = () => {
    setMonth(prev => {
      if (prev === 1) {
        setYear(y => y - 1);
        return 12;
      }
      return prev - 1;
    });
  };

  // Increment month, and year if necessary
  const handleNextMonth = () => {
    setMonth(prev => {
      if (prev === 12) {
        setYear(y => y + 1);
        return 1;
      }
      return prev + 1;
    });
  };

  return (
    <>
      <MenuPanel />
      <div className="analytics-page">
        <MonthSelector
          month={month}
          year={year}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />

        <div className="total-spent-indicator">
          Total: <span className={total < 0 ? "negative" : "positive"}>${Math.abs(total).toFixed(2)}</span>
        </div>

        <CategorySelector
          categories={categories}
          currentIndex={categoryIndex}
          onPrev={handlePrevCategory}
          onNext={handleNextCategory}
        />

        <div className="analytics-transactions-panel">
          <div className="transactions-header">
            <h2>{categories[categoryIndex].replace(/_/g, " ")}</h2>
          </div>

          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Loading transactions...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <p className="error-text">Error: {error}</p>
            </div>
          )}

          {!loading && !error && recentTransactions.length === 0 && (
            <p className="no-transactions">No transactions available.</p>
          )}

          {!loading && !error && recentTransactions.length > 0 && (
            <div className="dtransactions-table-container">
              <table className="dtransactions-table">
                <thead>
                  <tr>
                    <th>Merchant</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx, index) => (
                    <tr key={index}>
                      <td>{tx.merchant_name || tx.name || "Unknown Merchant"}</td>
                      <td className={tx.amount < 0 ? "negative" : "positive"}>
                        {tx.amount < 0
                          ? `-$${Math.abs(tx.amount).toFixed(2)}`
                          : `+$${tx.amount.toFixed(2)}`}
                      </td>
                      <td>{new Date(tx.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Analytics;