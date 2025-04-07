import React from 'react';
import '../styling/piechart.css'; 

const PieChart = ({ highlightedWidth }) => {
  const strokeWidth = 20; // overall thickness
  const radius = 100;     // size of the circle
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - highlightedWidth / 100); // Calculate the stroke

  return (
    <div className="pie-chart-container">
      <svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
        <circle
          className="base-circle"
          strokeWidth={strokeWidth}
          r={radius}
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
        />
        <circle
          className="highlight-circle"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={radius}
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          style={{ strokeWidth: strokeWidth }} 
        />
      </svg>
    </div>
  );
};

export default PieChart;