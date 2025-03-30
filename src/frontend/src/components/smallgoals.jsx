import React, { useState } from "react";
import "../styling/goals.css";

const SmallGoals = ({ goalsArray }) => {
  var totalAmmount = 0;
  var totalProgress = 0;

  for (var i = 0; i < goalsArray.length; i += 1) {
    totalAmmount += goalsArray[i].amount;
    totalProgress += goalsArray[i].progress;
  }
  return (
    <div className="your-goals-small">
      <h3> Hello</h3>
      <h3>
        {totalProgress}/{totalAmmount}
      </h3>
    </div>
  );
};

export default SmallGoals; // This component is a placeholder for displaying small goals.
