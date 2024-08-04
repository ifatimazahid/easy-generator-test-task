import React from 'react';
import { Typography, Button } from '@mui/material';
import { useAuth } from '../../common/authentication';

const WelcomePage = () => {

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
      <div style={styles.welcomeBox}>
        <Typography variant="h4" gutterBottom>
          Welcome to the application!
        </Typography>
        <Typography variant="body1" gutterBottom>
          We are glad to have you back. Explore our site and enjoy your stay.
        </Typography>
          <Button 
          variant="contained" 
          color="primary" 
          onClick={handleLogout}
          style={styles.button}
        >
          Logout
        </Button>
      </div>
  );
};

const styles = {
  welcomeBox: {
    background: '#fff',
    padding: '40px 20px',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  button: {
    marginTop: '20px',
  }
};

export default WelcomePage;
