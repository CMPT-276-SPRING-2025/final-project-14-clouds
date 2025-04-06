import React, { useState, useEffect } from "react";
import "../styling/goals.css";
import "../styling/menu.css";
import { Link } from "react-router-dom";
import Logo from "../styling/Removal-906.png";
import SmallGoals from "../components/smallgoals";
import BigGoals from "../components/largegoals";
import AddGoal from "../components/addgoals";
import MenuPanel from "../components/MenuPanel";

const Goals = ({ goals, setGoals }) => {
  useEffect(() => console.log(goals), [goals]);

  return (
    <>
      <MenuPanel setter={setGoals} />

      <SmallGoals goalsArray={goals} />
      <BigGoals goalsArray={goals} setterFunction={setGoals} />
      <AddGoal onAddGoal={setGoals} />
    </>
  );
};

export default Goals;
