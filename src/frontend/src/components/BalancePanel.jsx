import React from "react";
import "../styling/BalancePanelDashboard.css";
import { useEffect, useState } from "react";

function BalancePanel() {
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="panel"
      >
        <div style={{ marginLeft: "0px" }} className="tbalance">
          <p style={{ fontSize: "40px", fontWeight: "bold" }}>Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="panel">
        <h2 style={{ marginTop: "10px" }}> Your Balance</h2>

        <div className="tbalance">
          <p>Total Balance:</p>
          <br></br>
          <p style={{ fontSize: "40px", fontWeight: "bold" }}>${total}</p>
        </div>

        <div className="details">
          <p>Chequing:</p>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: "-5px",
            }}
          >
            ${checkings}
          </p>

          <p>Savings:</p>
          <p
            style={{ fontSize: "24px", fontWeight: "bold", marginTop: "-5px" }}
          >
            ${savings}
          </p>
        </div>
      </div>
    </>
  );
}

export default BalancePanel;
