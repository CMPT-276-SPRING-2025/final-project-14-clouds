import React from "react";
import "../styling/piechart.css";

const PieChart = ({ incomePercentage, expensePercentage }) => {
  const strokeWidth = 20;
  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  const incomeLength = (incomePercentage / 100) * circumference;
  const expenseLength = (expensePercentage / 100) * circumference;

  return (
    <div className="pie-chart-container">
      <svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
        {/* Base Circle */}
        <circle
          className="base-circle"
          strokeWidth={strokeWidth}
          r={radius}
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
        />

        {/* Income (Green) Circle */}
        {incomePercentage > 0 && (
          <circle
            className="income-circle"
            strokeWidth={strokeWidth}
            r={radius}
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            strokeDasharray={`${incomeLength} ${circumference}`}
            strokeDashoffset={0}
            style={{ stroke: "#0CD1A5", fill: "none" }}
          />
        )}

        {/* Expense (Red) Circle */}
        {expensePercentage > 0 && (
          <circle
            className="expense-circle"
            strokeWidth={strokeWidth}
            r={radius}
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            strokeDasharray={`${expenseLength} ${circumference}`}
            strokeDashoffset={-incomeLength}
            style={{ stroke: "red", fill: "none" }}
          />
        )}
      </svg>
    </div>
  );
};

export default PieChart;
