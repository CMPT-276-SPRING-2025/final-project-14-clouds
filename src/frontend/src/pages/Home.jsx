import "../styling/index.css";
import Logo from "../styling/Removal-906.png";
import { Link } from "react-router-dom";
import React from "react";
//import BalancePanel from "../components/BalancePanel";
function Home() {
  return (
    <>
      <div className="welcome">
        <div className="glowing-circle"></div>

        <Link to="/Login">
          <div className="start-button">Get started now</div>
        </Link>

        <div className="background-container">
          <div className="profile">
            <img src={Logo} alt="profile pic" className="profile-circle" />
          </div>
          <h1>
            Your Secure <br /> Gateway to Simple, <br /> Smart Finances
          </h1>
        </div>
      </div>
    </>
  );
}

export default Home;
