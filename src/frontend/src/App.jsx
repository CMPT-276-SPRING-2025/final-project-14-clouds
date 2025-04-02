import { useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import AccountActivity from "./pages/AccountActivity";
import Advice from "./pages/Advice";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [goals, setGoals] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/AccountActivity" element={<AccountActivity goals={goals} />}></Route>
        <Route path="/Advice" element={<Advice />}></Route>
        <Route path="/Analytics" element={<Analytics />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route
          path="/Goals"
          element={<Goals goals={goals} setGoals={setGoals} />}
        ></Route>
        <Route path="/Login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
