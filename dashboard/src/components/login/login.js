import React, { useState } from 'react';
import './login.css';
import { FaUserAlt, FaLock } from 'react-icons/fa';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      console.log('Full server response:', data);
  
      if (data.success) {
        // Authentication successful, retrieve the username and permissions
        const loggedInUsername = username;
        const loggedInPermissions = data.permissions; // Adjust based on your server response
        console.log('Received username and permissions ', loggedInUsername, loggedInPermissions);
        onLoginSuccess(loggedInUsername, loggedInPermissions);
      } else {
        // Authentication failed, handle error
        console.log('Login failed');
        alert('Login failed. Please check your username and password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login. Please try again later.');
    }
  };

  return (
    <div className='login-page'>
    <div className='wrapper'>
      <form action=''>
        <h1>Login</h1>
        <div className='input-box'>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUserAlt className='icon' />
        </div>
        <div className='input-box'>
          <input
            type='password'
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className='icon' />
        </div>
        <div className='forgot'>
          <a href='#'>Forgot password</a>
        </div>

        <button type='button' onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;