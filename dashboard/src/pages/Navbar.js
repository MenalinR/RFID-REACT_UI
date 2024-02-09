import { Link, useLocation } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import { IoPersonAdd } from 'react-icons/io5';
import { AiOutlineSchedule } from 'react-icons/ai';
import { MdPersonAddAlt } from 'react-icons/md';
import { TbReportSearch } from 'react-icons/tb';
import '../components/navbar.css';
import { useState, useEffect } from 'react';

const Navbar = ({ show, loggedInUser, userPermissions }) => {
  const permissions = userPermissions;
  const location = useLocation();
  const [activePage, setActivePage] = useState('');

  useEffect(() => {
    // Update activePage when the location changes
    setActivePage(location.pathname);
  }, [location]);

  const isPermissionGranted = (permission) => permissions && permissions.includes(permission);

  return (
    <div className={show ? 'sidenav active' : 'sidenav'}>
      <ul>
        <li className={activePage === '/Home' ? 'selected' : ''}>
          <Link to="/Home" onClick={() => setActivePage('/Home')}>
            <IoHome />
            <span className="menu-text">Home</span>
          </Link>
        </li>
        <li className={activePage === '/AddAdmin' ? 'selected' : ''}>
          {isPermissionGranted('manage_user') ? (
            <Link to="/AddAdmin" onClick={() => setActivePage('/AddAdmin')}>
              <IoPersonAdd />
              <span className="menu-text"> Manage user</span>
            </Link>
          ) : (
            <span>
              <IoPersonAdd className="dull-color" />
              <span className="menu-text dull-color">Manage user</span>
            </span>
          )}
        </li>
        <li className={activePage === '/ScheduleMeet' ? 'selected' : ''}>
          {isPermissionGranted('schedule_meeting') ? (
            <Link to="/ScheduleMeet" onClick={() => setActivePage('/ScheduleMeet')}>
              <AiOutlineSchedule />
              <span className="menu-text">Schedule Meeting</span>
            </Link>
          ) : (
            <span>
              <AiOutlineSchedule className="dull-color" />
              <span className="menu-text dull-color"> Schedule Meeting</span>
            </span>
          )}
        </li>
        <li className={activePage === '/MeetingTable' ? 'selected' : ''}>
          {isPermissionGranted('meeting_details') ? (
            <Link to="/MeetingTable" onClick={() => setActivePage('/MeetingTable')}>
              <AiOutlineSchedule />
              <span className="menu-text">Meeting Details</span>
            </Link>
          ) : (
            <span>
              <AiOutlineSchedule className="dull-color" />
             < span className="menu-text dull-color">  Meeting Details</span>
            </span>
          )}
        </li>
        <li className={activePage === '/AddEmployee' ? 'selected' : ''}>
          {isPermissionGranted('user_creation') ? (
            <Link to="/AddEmployee" onClick={() => setActivePage('/AddEmployee')}>
              <MdPersonAddAlt />
              <span className="menu-text">Add Employee</span> 
            </Link>
          ) : (
            <span>
              <MdPersonAddAlt className="dull-color" />
              < span className="menu-text dull-color">Add Employee</span>
            </span>
          )}
        </li>
        <li className={activePage === '/Log' ? 'selected' : ''}>
          {isPermissionGranted('log') ? (
            <Link to="/Log" onClick={() => setActivePage('/Log')}>
              <TbReportSearch />
              <span className="menu-text">Log</span>
            </Link>
          ) : (
            <span>
              <TbReportSearch className="dull-color" />
              <span className="menu-text dull-color"> Log</span>
            </span>
          )}
        </li>
      </ul>
      <p id="pp">Powered by Digital Projects.</p>
    </div>
  );
};

export default Navbar;
