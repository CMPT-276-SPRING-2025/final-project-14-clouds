import React, { useState } from "react";
import "../styling/goals.css";

const AddGoal = ({ onAddGoal }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && amount && date) {
      onAddGoal((prev) => [...prev, { title, amount, date, progress: 0 }]);
      setTitle("");
      setAmount("");
      setDate("");
    }
  };

  return (
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
        onChange={(e) => setAmount(parseFloat(e.target.value))}
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
    </div>
  );
};

export default AddGoal;
// This component allows users to add a new goal by entering a title, target amount, and date.
