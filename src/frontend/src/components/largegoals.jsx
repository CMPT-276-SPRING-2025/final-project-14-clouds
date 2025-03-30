import React, { useEffect, useState } from "react";
import "../styling/goals.css";

const BigGoals = ({ goalsArray, setterFunction }) => {
  const [increments, setIncrements] = useState(goalsArray.map((value) => 0));

  useEffect(() => {
    setIncrements((prev) => [...prev, 0]);
  }, [goalsArray]);

  var listGoals = [];
  if (goalsArray.length === 0) {
    return (
      <div className="your-goals-big">
        <h3>Your Goals</h3>
      </div>
    );
  } else {
    goalsArray.map((value, index) => {
      listGoals.push(
        <div
          style={{
            border: "solid",
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => {
              const updatedGoals = goalsArray.map((value, i) => {
                if (i === index) {
                  if (
                    value.progress + increments[i] <= value.amount &&
                    value.progress + increments[i] >= 0
                  ) {
                    return {
                      ...value,
                      progress: value.progress + increments[i],
                    };
                  }
                }
                return value;
              });
              setterFunction(updatedGoals);
            }}
          >
            +
          </button>
          &nbsp;
          <input
            id="input"
            onChange={(e) => {
              if (e.target.value !== "") {
                const updatedIncrements = increments.map((value, i) =>
                  i === index ? parseFloat(e.target.value) : value
                );
                setIncrements(updatedIncrements);
              } else {
                const updatedIncrements = increments.map((value, i) =>
                  i === index ? 0 : value
                );
                setIncrements(updatedIncrements);
              }
            }}
          ></input>
          &nbsp;
          <button
            onClick={() => {
              const updatedGoals = goalsArray.map((value, i) => {
                if (i === index) {
                  if (
                    value.progress - increments[i] <= value.amount &&
                    value.progress - increments[i] >= 0
                  ) {
                    return {
                      ...value,
                      progress: value.progress - increments[i],
                    };
                  }
                }
                return value;
              });
              setterFunction(updatedGoals);
            }}
          >
            -
          </button>
          <p style={{ marginLeft: "28vw" }}>
            Name: {value.title}, {value.progress}/{value.amount}, date:{" "}
            {value.date}
          </p>
        </div>
      );
    });

    return (
      <div className="your-goals-big">
        <h3>Your Goals</h3>
        <div style={{ marginBottom: "20vh" }}>{listGoals}</div>
      </div>
    );
  }
};

export default BigGoals; // This component is a placeholder for displaying big goals.
