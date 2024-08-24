// src/components/Navbar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Cat Healthcare System
        </Typography>
        {isLoggedIn && <Button color="inherit" component={Link} to="/home">Home</Button>}
        {/* <Button color="inherit" component={Link} to="/">Home</Button> */}
        {!isLoggedIn && <Button color="inherit" component={Link} to="/signup">Sign Up</Button>}
        {!isLoggedIn && <Button color="inherit" component={Link} to="/login">Login</Button>}
        {isLoggedIn && <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>}
        {isLoggedIn && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
