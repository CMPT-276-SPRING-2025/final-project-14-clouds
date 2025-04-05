import "../styling/menu.css";
import { Link } from "react-router-dom";
import Logo from "../styling/Removal-906.png";
import MenuPanel from "../components/MenuPanel";

function Analytics({ goals, setGoals }) {
  return (
    <>
      <MenuPanel setter={setGoals} />
    </>
  );
}

export default Analytics;
