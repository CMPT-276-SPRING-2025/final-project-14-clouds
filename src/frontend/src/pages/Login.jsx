import "../styling/Login.css";
import Plaid from "../styling/plaid.jpg"
import P2 from "../styling/p2.png"

function Login() {
  return (
    <div className="login">
      <div className="log-button">LOGIN WITH PLAID</div>
      <div className="glowing-circle"></div>
      <div className="background-container">
        <div className="profile">
          <img src={P2} alt="log in page pic" className="profile-circle" />
        </div>
        <div className="plaid">
          <img src={Plaid} alt="plaid logo" className="plaid-logo" />
        </div>
        <h1>
          Welcome, <br /> We are glad to see you
        </h1>
      </div>
    </div>
  );
}
export default Login;
