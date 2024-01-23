import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoHome, IoPersonAdd } from 'react-icons/io5';
import { AiOutlineSchedule } from 'react-icons/ai';
import { MdPersonAddAlt } from 'react-icons/md';
import { TbReportSearch } from 'react-icons/tb';
import '../components/navbar.css';

const Navbar = ({ show, loggedInUser, userPermissions }) => {
  const [selectedPage, setSelectedPage] = useState(null);

  const handlePageClick = (page) => {
    setSelectedPage(page);
  };

  const renderNavItem = (page, icon, label, permission) => (
    <li className={selectedPage === page ? 'selected' : ''} key={page}>
      <Link to={`/${page}`} onClick={() => handlePageClick(page)}>
        {icon}
        {label}
      </Link>
    </li>
  );

  return (
    <div className={show ? 'sidenav active' : 'sidenav'}>
      <ul>
        {renderNavItem('Home', <IoHome />, 'Home')}
        {renderNavItem('AddAdmin', <IoPersonAdd />, 'Manage user', 'manage_user')}
        {renderNavItem('ScheduleMeet', <AiOutlineSchedule />, 'Schedule Meeting', 'schedule_meeting')}
        {renderNavItem('MeetingTable', <AiOutlineSchedule />, 'Meeting Details', 'meeting_details')}
        {renderNavItem('AddEmployee', <MdPersonAddAlt />, 'Add Employee', 'user_creation')}
        {renderNavItem('Log', <TbReportSearch />, 'Log', 'log')}
      </ul>
      <p id="pp">Powered by Digital Projects.</p>
    </div>
  );
};

export default Navbar;