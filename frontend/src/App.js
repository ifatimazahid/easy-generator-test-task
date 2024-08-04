import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import WelcomePage from './Screens/Welcome';
import { AuthProvider, useAuth } from './common/authentication';

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<WelcomePageWithAuth />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
};

const WelcomePageWithAuth = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
  }

  return <WelcomePage />;
};

export default App;
