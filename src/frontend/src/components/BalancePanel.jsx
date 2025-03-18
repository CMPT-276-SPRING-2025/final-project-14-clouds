import "../styling/BalancePanel.css";
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
        class="panel"
      >
        <div style={{ marginLeft: "0px" }} class="tbalance">
          <p style={{ fontSize: "40px", fontWeight: "bold" }}>Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div class="panel">
        <h2> Your Balance</h2>

        <div class="tbalance">
          <p>Total Balance:</p>
          <br></br>
          <p style={{ fontSize: "40px", fontWeight: "bold" }}>${total}</p>
        </div>

        <div class="details">
          <p>Chequing:</p>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: "-15px",
            }}
          >
            ${checkings}
          </p>

          <p>Savings:</p>
          <p
            style={{ fontSize: "24px", fontWeight: "bold", marginTop: "-15px" }}
          >
            ${savings}
          </p>
        </div>
      </div>
    </>
  );
}

export default BalancePanel;
