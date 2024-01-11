import { Link } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import { IoPersonAdd } from 'react-icons/io5';
import { AiOutlineSchedule } from 'react-icons/ai';
import { MdPersonAddAlt } from 'react-icons/md';
import { TbReportSearch } from 'react-icons/tb';
import '../components/navbar.css'; 

const Navbar = ({ show, loggedInUser, userPermissions }) => {
  const permissions = userPermissions; // Assuming permissions are directly available in userPermissions

  const isPermissionGranted = (permission) => permissions && permissions.includes(permission);

  return (
    <div className={show ? 'sidenav active' : 'sidenav'}>
      <ul>
        <li>
          <Link to="/Home">
            <IoHome />
            Home
          </Link>
        </li>
        <li className={!isPermissionGranted('manage_user') ? 'dull-color' : ''}>
          {isPermissionGranted('manage_user') ? (
            <Link to="/AddAdmin">
              <IoPersonAdd />
              Manage user
            </Link>
          ) : (
            <span>
              <IoPersonAdd className="dull-color" />
              Manage user
            </span>
          )}
        </li>
        <li className={!isPermissionGranted('schedule_meeting') ? 'dull-color' : ''}>
          {isPermissionGranted('schedule_meeting') ? (
            <Link to="/ScheduleMeet">
              <AiOutlineSchedule />
              Schedule Meeting
            </Link>
          ) : (
            <span>
              <AiOutlineSchedule className="dull-color" />
              Schedule Meeting
            </span>
          )}
        </li>
        <li className={!isPermissionGranted('meeting_details') ? 'dull-color' : ''}>
          {isPermissionGranted('meeting_details') ? (
            <Link to="/MeetingTable">
              <AiOutlineSchedule />
              Meeting Details
            </Link>
          ) : (
            <span>
              <AiOutlineSchedule className="dull-color" />
              Meeting Details
            </span>
          )}
        </li>
        <li className={!isPermissionGranted('user_creation') ? 'dull-color' : ''}>
          {isPermissionGranted('user_creation') ? (
            <Link to="/AddEmployee">
              <MdPersonAddAlt />
              Add Employee
            </Link>
          ) : (
            <span>
              <MdPersonAddAlt className="dull-color" />
              Add Employee
            </span>
          )}
        </li>
        <li className={!isPermissionGranted('log') ? 'dull-color' : ''}>
          {isPermissionGranted('log') ? (
            <Link to="/Log">
              <TbReportSearch />
              Log
            </Link>
          ) : (
            <span>
              <TbReportSearch className="dull-color" />
              Log
            </span>
          )}
        </li>
      </ul>
      <p id="pp">Powered by Digital Projects.</p>
    </div>
  );
};

export default Navbar;
