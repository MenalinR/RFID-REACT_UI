// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { GiHamburgerMenu } from 'react-icons/gi';
import Home from './pages/Home';
import AddAdmin from './pages/AddAdmin';
import RemoveAdmin from './pages/RemoveAdmin';
import AddEmployee from './pages/AddEmployee';
import logo from './components/slt.png';
import './App.css';

function App() {
  const [showNav, setshowNav] = useState(false);

  return (
    <Router>
      <header>
        <GiHamburgerMenu onClick={() => setshowNav(!showNav)} />
        <img src={logo} alt='Logo' className='logo'/>
        
      </header>
      <Navbar show={showNav} />
      <div className="main">
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/AddAdmin" element={<AddAdmin />} />
        <Route path="/RemoveAdmin" element={<RemoveAdmin />} />
        <Route path="/AddEmployee" element={<AddEmployee />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
