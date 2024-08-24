// src/pages/DoctorProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorProfile = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await axios.get('/api/doctors');
      setDoctors(res.data);
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/doctors', { name, specialty });
      setDoctors([...doctors, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Doctor Profiles</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="Specialty" required />
        <button type="submit">Add Doctor</button>
      </form>
      <div>
        {doctors.map((doctor) => (
          <div key={doctor._id}>
            {doctor.name} - {doctor.specialty}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorProfile;
