import "../styling/BalancePanel.css";

function BalancePanel({ checkings, savings, total }) {
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
