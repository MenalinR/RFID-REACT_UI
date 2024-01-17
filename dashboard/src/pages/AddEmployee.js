// AddEmployee.js
import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import '../components/addemp.css';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEmployee = () => {
  const [data, setData] = useState([]);
  const [name, setname]= useState('')
  const [EID, setEmployeeID] = useState('');
  const [RFID_no, setRFIDNo] = useState('');
  const [phone_no, setPhoneNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [building, setBuilding] = useState('');
  const [role, setJobRole] = useState('');
  const [ setShowModal] = useState(false);
  const [ setModalMessage] = useState('');
  const eid =useRef('');
  const ename =useRef('');
  const no =useRef('');
  const pno =useRef('');
  const dep =useRef('');
  const bui =useRef('');
  const job =useRef('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
 
 
  useEffect(() => {
    axios.get('http://localhost:8000/AddEmployee')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
    
  }, []);
  
  const customToastStyle = {
    width: 'auto', // Adjust the width as needed
    fontSize: '14px', // Adjust the font size as needed
  };
  const handleDelete = (EID) => {
    // Send a DELETE request to the backend API
    axios.delete(`http://localhost:8000/DeleteEmployee/${EID}`)
      .then(response => {
        // Handle success if needed
        // Check for a successful response (status code in the 2xx range)
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          toast.success('Record deleted successfully');
  
          // Fetch updated data after deleting a record
          axios.get('http://localhost:8000/AddEmployee')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
        } else {
          // Handle error for non-2xx status codes
          console.error('Error deleting employee:', response.data);
        }
      })
      .catch(error => {
        // Handle error if needed
        console.error('Error deleting employee:', error);
      });
  };



  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    eid.current.value="";
    ename.current.value="";
    no.current.value="";
    pno.current.value="";
    dep.current.value="";
    bui.current.value="";
    job.current.value="";

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setModalMessage('Employee name should only contain letters and spaces.');
      setShowModal(true);
      return;
    }

    if (!/^\d{10}$/.test(phone_no)) {
      setModalMessage('Invalid phone number. Please enter a 10-digit phone number.');
      setShowModal(true);
      return;
    }

    axios.post('http://localhost:8000/AddEmployee', {
      EID,
      name, 
      RFID_no,
      phone_no,
      department,
      building,
      role,
    })
    .then(response => {
      // Handle success if needed
      // Check for a successful response (status code in the 2xx range)
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        toast.success('Record saved successfully');

        // Fetch updated data after adding a new record
        axios.get('http://localhost:8000/AddEmployee')
        .then(res => setData(res.data))

      .catch(err => console.log(err));
      } else {
        // Handle error for non-2xx status codes
        console.error('Error adding employee:', response.data);
      }
    })
    .catch(error => {
      // Handle error if needed
      console.error('Error adding employee:', error);
    });
     // console.error('Post request is done');
    // Add your form submission logic here
  };
  


  // const resetForm = () => {
  //   name('')
  //     EID('')
  //     RFID_no('')
  //     phone_no('')
  //     department('')
  //     building('')
  //     role('')
  //   document.getElementById('resume-form').reset()
  // }

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filtered = data.filter(d =>
      Object.values(d).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit} className="form-container">
      <div className="form-header">
          <p>Create an Employee</p>
        </div>
        <div className="form-group">
          <label>Employee ID</label>
          <input type="text"  ref={eid} placeholder="Enter ID" name="EID" required
          onChange={e => setEmployeeID(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Employee Name</label>
          <input type="text" ref={ename}  placeholder="Enter Employee Name" name="name" required 
           pattern="^[a-zA-Z\s]+$"
           title="Employee name should only contain letters and spaces." 
          onChange={e => setname(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>RFID No</label>
          <input type="text" ref={no} placeholder="Enter ID" name="RFID_no" required
          onChange={e => setRFIDNo(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" ref={pno} placeholder="Enter Phone Number" name="phone_no" required 
           pattern="^\d{10}$"
           title="Please enter a 10-digit phone number."
          onChange={e => setPhoneNumber(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Department</label>
          <input type="text" ref={dep} placeholder="Enter Department" name="department" required 
          onChange={e =>  setDepartment(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Building</label>
          <input type="text" ref={bui} placeholder="Enter Phone Number" name="building" required
          maxLength={1}
          onChange={e => setBuilding(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Job Role</label>
          <input type="text" ref={job} placeholder="Enter Job Role" name="role" required 
          onChange={e => setJobRole(e.target.value)}/>
        </div>
        <div className="form-group clearfix">
          <button type="submit" className="signup-btn">
            Add
          </button>
          {/* <space direction="horizontal" size={12}></space>
          <button type="button" className="reset-btn" onClick={handleReset}>
  Reset
</button> */}

        </div>
      </form>


      <div className="table">
      <h2>Employee Table</h2>
      <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>RFID No</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Building</th>
            <th>Job Role</th>
            
          </tr>
        </thead>
        
        <tbody >
          {data.map((d) => (
            <tr key={d.EID}>
              <td>{d.EID}</td>
              <td>{d.name}</td>
              <td>{d.RFID_no}</td>
              <td>{d.phone_no}</td>
              <td>{d.department}</td>
              <td>{d.building}</td>
              <td>{d.role}</td>
              <td>
                
                
                <button className='btn-danger' onClick={() => handleDelete(d.EID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
    <ToastContainer
        toastStyle={customToastStyle}
    />
    </div>
  );
};

export default AddEmployee;