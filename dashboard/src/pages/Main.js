// Main.js
import React, { useState } from 'react';
import backgroundImage from '../components/background.jpg';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import MeetingTable from '../pages/MeetingTable';
import AddAdmin from '../pages/AddAdmin';
import AddEmployee from '../pages/AddEmployee';
import ScheduleMeet from '../pages/ScheduleMeet';
import Log from '../pages/Log';
import { FaSearch } from 'react-icons/fa';
// import { IoSearchCircle } from "react-icons/io5";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (


     <div className="main-container">
      <div className="background-overlay"></div>

    <div
      className="main"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        opacity:'0.6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '40px',
        color: 'black',
        width: '160vh',
        marginLeft: '320px',
        marginTop: '-217px',
      }}
    >
      <div className="searchbar">
     
        <input 
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
         <FaSearch className="search-icon" />
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AddAdmin" element={<AddAdmin />} />
        <Route path="/AddEmployee" element={<AddEmployee />} />
        <Route path="/ScheduleMeet" element={<ScheduleMeet />} />
        <Route path="/MeetingTable" element={<MeetingTable />} />
        <Route path="/Log" element={<Log />} />
      </Routes>
    </div>
    </div>
  );
};

export default Main;
