// Header.js
import React from 'react';
import '../components/header.css';
import mobi from '../components/mobi.png';

const Header = () => {
  return (
    <div className="header">
       <div className="logo-container">
          <img src={mobi} alt="Logo" className="logo" />
          <p>SMART MEETING ROOM RESERVATION</p>
        </div>
    </div>
  );
};

export default Header;
