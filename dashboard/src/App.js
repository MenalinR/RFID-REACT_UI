import React, { useState } from 'react';
// import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
// import ForgotPassword from './pages/forgot';
import Login from './components/login/login'
import Dash from './pages/dash';
import './components/login/login.css';


const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userPermissions, setUserPermissions] = useState([]);
  const [username, setUsername] = useState('');

  const handleLoginSuccess = async (loggedInUsername) => {
    console.log('Received username:', loggedInUsername);
    
    setUsername(loggedInUsername);
   

    try {
      const response = await fetch(`http://localhost:8000/getUserPermissions/${loggedInUsername}`, {
        method: 'GET',
        credentials: 'include', //  credentials in the request
      });

      const data = await response.json();

      console.log('Server response:', data);

      if (data.success) {
       
        console.log('permissions:', data.permissions);
        setUserPermissions(data.permissions);
        setAuthenticated(true);
      } else {
        console.log('Failed to fetch user permissions:', data.error);
      }
    } catch (error) {
      console.error('Error during fetching user permissions:', error);
    }
  };

  return (
    <div>
      {authenticated ? (
       //  passing username and userPermissions
       <Dash username={username} userPermissions={userPermissions} />
       ) : (
         //  passing the handleLoginSuccess callback
         <Login onLoginSuccess={handleLoginSuccess} />
       )}
    </div>
  );
};

export default App;