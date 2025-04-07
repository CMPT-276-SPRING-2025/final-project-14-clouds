import React, { useState, useEffect } from 'react';
import PieChart from './chartcomponent';
import '../styling/piechart.css';  

const MyComponent = ({ numerator, denominator }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (denominator !== 0) {
      const percentage = (numerator / denominator) * 100;
      setProgress(percentage);
    } else {
      setProgress(0); // no division by zero
    }
  }, [numerator, denominator]);

  return (
    <div>
        <PieChart highlightedWidth={progress} />
    </div>
  );
};

export default MyComponent;