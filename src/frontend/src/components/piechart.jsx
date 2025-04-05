import React, { useState, useEffect } from 'react';
import PieChart from './chartcomponent';

const MyComponent = () => {
  const [progress, setProgress] = useState(50); //highlighted width

  useEffect(() => {
    // updating the progress over time
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 5 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Financial Overview</h2>
      <div style={{ width: '150px', height: '150px' }}>  
        <PieChart highlightedWidth={progress} />
      </div>
    </div>
  );
};

export default MyComponent;