import React from "react";
import "../styling/menu.css";
import { Link } from "react-router-dom";
import Logo from "../styling/Removal-906.png";

function MenuPanel({ setter }) {
  return (
    <>
      <div className="nav">
        <div className="logo-container">
          <img src={Logo} alt="profile logo" className="logo" />
        </div>
      </div>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/AccountActivity">Account Activity</Link>
          </li>
          <li>
            <Link to="/Goals">My Goals</Link>
          </li>
          <li>
            <Link to="/Analytics">Analytics</Link>
          </li>
          <li>
            <Link to="/Advice">Advice</Link>
          </li>

          <Link to="/">
            <button className="logout" onClick={() => setter([])}>
              Log Out
            </button>
          </Link>
        </ul>
      </nav>
    </>
  );
}
export default MenuPanel;
