import "../styling/Dashboard.css";
import React, { useState, useEffect } from "react";
import BalancePanel from "../components/BalancePanel";
import MenuPanel from "../components/MenuPanel";
import DashboardTransactions from "../components/DashboardTransactions";
import DashboardGoals from "../components/DashboardGoals";
import { Link } from "react-router-dom";

function Dashboard({ goals, setGoals }) {
  useEffect(() => console.log(goals), [goals]);

  return (
    <div className="Dashboard-page">
      <MenuPanel setter={setGoals} />
      <div className="dashboard-content-container">
        {/* Left content */}
        <div className="dashboard-content">
          <BalancePanel />
          <DashboardGoals goalsArray={goals} />
          <DashboardTransactions />
        </div>

        {/* Right content (two placeholder panels stacked vertically) */}
        <div className="dashboard-content1">
          <div className="placeholder-panel">
            <h3>Analytics</h3>
            <p>Let's find room for improvement!</p>
            <Link to="/Analytics">
              <button>Analyze Net Finances</button>
            </Link>
          </div>
          <div className="placeholder-panel2">
            <h3>Need some advice?</h3>
            <p>Click here and let's help you out!</p>
            <Link to="/Advice">
              <button>Ask for Advice</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
