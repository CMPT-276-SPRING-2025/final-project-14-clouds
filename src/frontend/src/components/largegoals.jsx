import React, { useState } from "react";
import "../styling/goals.css";

function listGoals(gArray) {}

const BigGoals = ({ goalsArray }) => {
  if (goalsArray.length === 0) {
    return (
      <div className="your-goals-big">
        <h3>Your Goals</h3>
      </div>
    );
  } else {
    listGoals = [];
    goalsArray.map((value) => {
      listGoals.push(
        <p>
          Name: {value.title}, ammount: {value.amount}, date: {value.date}
        </p>
      );
    });

    return (
      <div className="your-goals-big">
        <h3>Your Goals</h3>
        {listGoals}
      </div>
    );
  }
};

export default BigGoals; // This component is a placeholder for displaying big goals.
