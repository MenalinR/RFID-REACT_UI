import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import Main from './Main';
import '../components/header.css';
import '../components/main.css';
import '../components/navbar.css';





const Dash = ({ loggedInUser ,userPermissions }) => {
  const [showNav, setShowNav] = useState(true);

  return (
    <Router>
      <div className="dashboard">
        <Header />
        <div className="content">
          <Navbar show={showNav} setShowNav={setShowNav} loggedInUser={loggedInUser} userPermissions={userPermissions} />
          <Main />
        </div>
      </div>
    </Router>
  );
};

export default Dash;