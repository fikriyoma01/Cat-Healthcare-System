// src/pages/Infographics.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Infographics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/infographics');
      setData(res.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Infographics</h2>
      <div>{/* Render infographics data as needed */}</div>
    </div>
  );
};

export default Infographics;
