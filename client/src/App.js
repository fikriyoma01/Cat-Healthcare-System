// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CatProfile from './pages/CatProfile';
import Grooming from './pages/Grooming';
import DoctorAppointment from './pages/DoctorAppointment';
import CatBoarding from './pages/CatBoarding';
import Infographics from './pages/Infographics';
import FinancialReports from './pages/Finance';
import DoctorProfile from './pages/DoctorProfile';
import StorePerformance from './pages/StorePerformance';
import Articles from './pages/Articles';
import { AuthProvider } from './AuthContext';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cat-profile" element={<CatProfile />} />
            <Route path="/grooming" element={<Grooming />} />
            <Route path="/doctor-appointment" element={<DoctorAppointment />} />
            <Route path="/cat-boarding" element={<CatBoarding />} />
            <Route path="/infographics" element={<Infographics />} />
            <Route path="/financial-reports" element={<FinancialReports />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route path="/store-performance" element={<StorePerformance />} />
            <Route path="/articles" element={<Articles />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
