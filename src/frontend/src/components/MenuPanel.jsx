import "../styling/menu.css";
import { Link } from "react-router-dom";
import Logo from "../styling/Removal-906.png";


function MenuPanel() {
  return (
    <>

      <div className="nav">
        <div className="logo-container">
        <img src={Logo} alt="profile logo" className="logo" />
      </div>
      </div>
      <nav className="menu">
        <ul>
          <li><Link to="/Dashboard">Agrim</Link></li>
          <li><Link to="/AccountActivity">Account Activity</Link></li>
          <li><Link to="/Goals">My Goals</Link></li>
          <li><Link to="/Analytics">Analytics</Link></li>
          <li><Link to="/Advice">Advice</Link></li>
        </ul>
      </nav>

    </>
  );
}
export default MenuPanel;