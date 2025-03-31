import React, { useEffect, useState } from "react";
import "../styling/goals.css";
import Bin from "../assets/bin.png";

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
        <div className="goal-item">
          <button
            className="deleteButton"
            onClick={() => {
              alert(`deleted index ${index}`);
              const updatedGoalsArray = goalsArray.filter(
                (value, i) => index !== i
              );

              const updatedIncrements = increments.filter(
                (value, i) => index !== i
              );
              setterFunction(updatedGoalsArray);
              setIncrements(updatedIncrements);
            }}
          >
            <img src={Bin} alt="bin icon" />
          </button>
          <button
            className="plusButton"
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
            <p>+</p>
          </button>
          &nbsp;
          <input
            className="incrementInput"
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
            className="minusButton"
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <p>{value.title}</p>
              <p>{value.date}</p>
              <p>
                ${value.progress}/${value.amount}
              </p>
            </div>
            <div className="progressBar">
              <div
                className="progressBarFill"
                style={{ width: `${(value.progress / value.amount) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="your-goals-big">
        <h3
          style={{
            position: "absolute",
            top: "2vh",
            left: "1.5vw",
            borderBottom: "solid",
            width: "95%",
          }}
        >
          Your Goals
        </h3>
        <div className="goalsList">{listGoals}</div>
      </div>
    );
  }
};

export default BigGoals; // This component is a placeholder for displaying big goals.
