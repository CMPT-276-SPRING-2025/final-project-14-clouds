import React, { useState, useEffect } from "react";
import PieChart from "./chartcomponent";
import "../styling/piechart.css";

const MyComponent = ({ totalIncome, totalExpense, Net }) => {
  const [incomePercent, setIncomePercent] = useState(0);
  const [costPercent, setCostPercent] = useState(0);

  useEffect(() => {
    const totalActivity = totalIncome + Math.abs(totalExpense);

    if (totalActivity !== 0) {
      const incomeContribution = (totalIncome / totalActivity) * 100;
      const costContribution = (Math.abs(totalExpense) / totalActivity) * 100;

      setIncomePercent(incomeContribution);
      setCostPercent(costContribution);
    } else {
      setIncomePercent(0);
      setCostPercent(0);
    }
  }, [totalIncome, totalExpense, Net]);

  return (
    <div>
      <PieChart
        incomePercentage={incomePercent}
        expensePercentage={costPercent}
      />
    </div>
  );
};

export default MyComponent;
