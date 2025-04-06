//import "../styling/menu.css";
import React, { useState, useEffect } from "react";
import "../styling/AccountActivity.css";
//import { Link } from "react-router-dom";
//import Logo from "../styling/Removal-906.png";
import BalancePanel2 from "../components/BalancePanel2";
import MenuPanel from "../components/MenuPanel";
import TransactionsPanel from "../components/TransactionsPanel";
import OverviewPanel from "../components/OverviewPanel";
import YourGoalsAccount from "../components/AccActivityGoals";

function AccountActivity({ goals, setGoals }) {
  useEffect(() => console.log(goals), [goals]);
  return (
    <div className="AccountActivity-page">
      <MenuPanel setter={setGoals} />

      <div className="content-container">
        <div className="account-activity-content">
          <BalancePanel2 />
          <TransactionsPanel />
        </div>
        <div className="account-activity-content1">
          <YourGoalsAccount goalsArray={goals} />
          <OverviewPanel />
        </div>
      </div>
    </div>
  );
}

export default AccountActivity;
