import "../styling/Login.css";
// import Plaid from "../styling/plaid.jpg";
import P2 from "../styling/p2.png";
import LoginPanel from "../components/loginPanel";
import { useState, useEffect } from "react";

function Login() {
  const [status, setStatus] = useState("none");

  return (
    <>
      <div className="login">
        <div className="log-button" onClick={() => setStatus("block")}>
          LOGIN
        </div>

        <div className="background-container">
          <div className="profile">
            <img src={P2} alt="log in page pic" className="profile-circle" />
          </div>

          <h1>
            Welcome, <br /> We are glad to see you
          </h1>
        </div>
      </div>
      <div>
        <LoginPanel displayStatus={status} setter={setStatus} />
      </div>
    </>
  );
}
export default Login;
