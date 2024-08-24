// src/pages/StorePerformance.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StorePerformance = () => {
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    const fetchPerformance = async () => {
      const res = await axios.get('/api/performance');
      setPerformance(res.data);
    };

    fetchPerformance();
  }, []);

  return (
    <div>
      <h2>Store Performance</h2>
      <div>
        {performance.map((item) => (
          <div key={item._id}>
            {item.month} - Revenue: {item.revenue} - Expenses: {item.expenses}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePerformance;
