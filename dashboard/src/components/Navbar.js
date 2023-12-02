
import { Link} from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { IoPersonRemove } from "react-icons/io5";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdPersonAddAlt } from "react-icons/md";
import { MdOutlinePersonRemove } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";






const Navbar = ({show}) =>{
    return(
        <div className={show ? 'sidenav active':'sidenav'}> 
        
        <ul>
            <li>
                <Link to="/Home"><IoHome />Home</Link>
            </li>
            <li>
                <Link to="/AddAdmin"><IoPersonAdd />Add Admin</Link>
            </li>
            <li>
                <Link to="/RemoveAdmin"><IoPersonRemove />Remove Admin</Link>
            </li>
            <li>
                <Link to="/ScheduleMeet"><AiOutlineSchedule />Schedule Meeting</Link>
            </li>
            
            <li>
                <Link to="/AddEmployee"><MdPersonAddAlt />Add Employee</Link>
            </li>
            <li>
                <Link to="/"><MdOutlinePersonRemove />Remove Employee</Link>
            </li>
            <li>
                <Link to="/"><TbReportSearch />Log</Link>
            </li>
        </ul>
        </div>

    );


    
};

export default Navbar;