import React, { useState, useEffect } from "react";
import "../styling/goals.css";
import "../styling/menu.css";
import { Link } from "react-router-dom";
import Logo from "../styling/Removal-906.png";
import SmallGoals from "../components/smallgoals";
import BigGoals from "../components/largegoals";
import AddGoal from "../components/addgoals";

const Goals = ({ goals, setGoals }) => {
  useEffect(() => console.log(goals), [goals]);

  // const [title, setTitle] = useState("");
  // const [amount, setAmount] = useState("");
  // const [date, setDate] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (title && amount && date) {
  //     setGoals([...goals, { title, amount, date }]);
  //     setTitle("");
  //     setAmount("");
  //     setDate("");
  //   }
  // };

  return (
    <>
      <div className="nav"></div>
      <nav className="menu">
        <ul>
          <li>
            <img src={Logo} alt="profile logo" className="logo" />
          </li>
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
        </ul>
      </nav>

      {/* <div className="your-goals-small"></div>
      <div className="your-goals-big">
        <h3>Your Goals</h3>
        {goals.map((goal, index) => (
          <div key={index} className="goal-item">
            <strong>{goal.title}</strong> - ${goal.amount} (Achieve by:{" "}
            {goal.date})
          </div>
        ))}
      </div>
      <div className="set-goal">
        <div className="set-goal-title">Set a New Goal</div>
        <input
          type="text"
          name="title"
          placeholder="Goal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          name="amount"
          placeholder="Target Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          name="achieve-by"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Add Goal
        </button>
      </div> */}
      <SmallGoals />
      <BigGoals goalsArray={goals} />
      <AddGoal onAddGoal={setGoals} />
    </>
  );
};

export default Goals;
