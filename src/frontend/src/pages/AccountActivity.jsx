//import "../styling/menu.css";
import "../styling/AccountActivity.css"
//import { Link } from "react-router-dom";
//import Logo from "../styling/Removal-906.png";
import BalancePanel2 from "../components/BalancePanel2";
import MenuPanel from "../components/MenuPanel";
import TransactionsPanel from "../components/TransactionsPanel"
import OverviewPanel from "../components/OverviewPanel";

function AccountActivity() {
  return (

    <div className="AccountActivity-page">
      
        <MenuPanel />
     
      <div className="content-container">

        <div className="account-activity-content">
          <BalancePanel2 />
          <TransactionsPanel />
        </div>
        <div className="account-activity-content1">
        <div className="panel placeholder-panel">Goals Panel (Coming Soon)</div>
          <OverviewPanel />
        </div>
      </div>
    </div>
  );
}


export default AccountActivity;
