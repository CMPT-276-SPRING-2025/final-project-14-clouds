import React from "react";
import "../styling/OverviewPanel.css";
import { useEffect, useState } from "react";


function OverviewPanel() {
    const [earnings, setEarnings] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [net, setNet] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/getTransactions`);
                if (!response.ok) {
                    throw new Error("failed to fetch transactions");
                }
                const data = await response.json();
                const transactions = data.transactions;

                const cashIn = transactions
                    .filter((tx) => tx.amount > 0)
                    .reduce((acc, tx) => acc + tx.amount, 0);

                const cashOut = transactions
                    .filter((tx) => tx.amount < 0)
                    .reduce((acc, tx) => acc + tx.amount, 0);

                setEarnings(cashIn);
                setExpenses(Math.abs(cashOut));
                setNet(cashIn + cashOut);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTransactions();
    }, []);
    if (loading) {
        return <div className="overview-panel">Loading overview...</div>;
    }

    if (error) {
        return <div className="overview-panel">Error: {error}</div>;
    }
    return (
        <div className="overview-panel">
            <h3 className="overview-title">Overview</h3>
            <hr className="divider" />
            <p className="overview-subtitle">Last Month</p>
            <hr className="divider" />

            <div className="overview-item">
                <span>Cash In:</span>
                <span className="positive2">${earnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            <hr className="divider" />

            <div className="overview-item">
                <span>Cash Out:</span>
                <span className="negative2">-${expenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            <hr className="divider" />

            <div className="overview-item">
                <span>Earnings:</span>
                <span className={net >= 0 ? "positive2" : "negative2"}>
                    {net >= 0 ? "$" : "-$"}{Math.abs(net).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
            </div>

            <hr className="divider" />
        </div>

    );
}

export default OverviewPanel;