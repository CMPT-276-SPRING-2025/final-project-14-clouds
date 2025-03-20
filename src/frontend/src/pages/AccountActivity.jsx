import "../styles.css";
import TransactionsPanel from "../components/TransactionsPanel";
//import BalancePanel from "../components/BalancePanel2";
function AccountActivity() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <aside
        style={{
          width: "250px",
          background: "#2C3E50",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2>Dashboard</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>Transactions</li>
          <li>My Goals</li>
          <li>Analytics</li>
          <li>Advice</li>
        </ul>
      </aside>

      <main
        style={{
        
          padding: "20px",
          background: "#ECF0F1",
        }}
      >
        <div className="panel-grid">
         
          <TransactionsPanel /> {/* ✅ Display the Transactions Panel */}
        </div>
      </main>
    </div>
  );
}

export default AccountActivity;


