// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import AddAdmin from './pages/AddAdmin';

import AddEmployee from './pages/AddEmployee';
import ScheduleMeet from './pages/ScheduleMeet';
import RemoveEmp from './pages/RemoveEmp';
import Log from './pages/Log';


import SLTMobitel from './components/sl.png';

import './App.css';
import './components/rmv.css';
import './components/add.css';
import './components/remove.css';
import './components/ScheduleMeet.css';
import './components/addemp.css';
import './components/home.css';
import './components/log.css';


function App() {
  const [showNav, ] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <header>
       <div className='m'>
        <div className="image">
        <img src={SLTMobitel} alt='Logo' className='logo'/>
        <p>SMART  MEETING  ROOM  RESERVATION</p>
        </div>
        </div>
        
        
        
      </header>
    
      <Navbar show={showNav} />
      <div className="main" >
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
      <Route path="/Home" element={<Home />} />
        <Route path="/AddAdmin" element={<AddAdmin />} />
        
        <Route path="/AddEmployee" element={<AddEmployee />} />
        <Route path="/ScheduleMeet" element={<ScheduleMeet />} />
        <Route path="/RemoveEmp" element={<RemoveEmp />} />
        <Route path="/Log" element={<Log />} />

        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
