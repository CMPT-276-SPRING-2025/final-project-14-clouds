import React, { useState } from "react";
import "../styling/GoalsPanel.css"

const YourGoalsAccount = ({ goalsArray }) => {
  var totalAmmount = 0;
  var totalProgress = 0;

  for (var i = 0; i < goalsArray.length; i += 1) {
    totalAmmount += goalsArray[i].amount;
    totalProgress += goalsArray[i].progress;
  }
  return (
    <div className="goals-small">
      <div
        style={{
          textAlign: "left",
          width: "85%",

          marginTop: "-5vh",
        }}
      >
        <p
          style={{
            fontSize: "22px",
            fontWeight: 600,
            color: "#DFD7D8",
          }}
        >
          Your Goals
        </p>
      </div>

      <div className="smallGoalsInfo">
        <p>
          ${totalProgress}/
          <span style={{ fontWeight: "500", fontSize: "22px" }}>
            ${totalAmmount}
          </span>
        </p>
      </div>
    </div>
  );
};

export default YourGoalsAccount; // This component is a placeholder for displaying small goals.
