import BalancePanel2 from "../components/BalancePanel2";
import TransactionsPanel from "../components/TransactionsPanel";

function AccountActivity() {
  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h2>Account Activity</h2>
      <div 
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <BalancePanel2 />
      </div>
      <div 
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TransactionsPanel />
      </div>
    </div>
  );
}

export default AccountActivity;
