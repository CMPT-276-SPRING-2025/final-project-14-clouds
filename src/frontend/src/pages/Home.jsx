import "../styling/index.css";
import Logo from "../styling/Removal-906.png";
//import BalancePanel from "../components/BalancePanel"; 
function Home() {
  return (
    <>
    <div className="welcome">
      <div className="glowing-circle"></div>
      <div className="start-button">Get started now</div>
      <div className="background-container">
        <div className="profile">
          <img src={Logo} alt="profile pic" className="profile-circle" />
        </div>
        <h1>Your Secure <br /> Gateway to Simple, <br /> Smart Finances</h1>
      </div>
    </div>

    


  </>
);
}

export default Home;
