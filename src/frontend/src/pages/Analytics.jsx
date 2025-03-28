import "../styling/menu.css";
import { Link } from "react-router-dom";
import Logo from "../styling/Removal-906.png";


function Analytics() {
  return (
    <>
    <div className="nav">
    </div>

    <nav className="menu">
      <ul>
        <li>
          <img src={Logo} alt="profile logo" className="logo" />
        </li>
        <li><Link to="/Dashboard">Dashboard</Link></li>
        <li><Link to="/AccountActivity">Account Activity</Link></li>
        <li><Link to="/Goals">My Goals</Link></li>
        <li><Link to="/Analytics">Analytics</Link></li>
        <li><Link to="/Advice">Advice</Link></li>
      </ul>
    </nav>
  </>
);
}

export default Analytics;
