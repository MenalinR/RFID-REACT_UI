// AddEmployee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/addemp.css';

const AddEmployee = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

  
    // Add your form submission logic here
  };


  return (
    <div className="page">
      <form onSubmit={handleSubmit} className="form-container">
      <div className="form-header">
          <p>Create an Employee</p>
        </div>
        <div className="form-group">
          <label>Employee Name</label>
          <input type="text" placeholder="Enter Employee Name" name="employeeName" required  />
        </div>
        <div className="form-group">
          <label>Employee ID</label>
          <input type="text" placeholder="Enter ID" name="employeeID" required />
        </div>
        <div className="form-group">
          <label>RFID No</label>
          <input type="text" placeholder="Enter ID" name="employeeID" required />
        </div>
        <div className="form-group">
  <label>Phone Number</label>
  <input type="text" placeholder="Enter Phone Number" name="phoneNumber" required />
</div><div className="form-group">
  <label>Building</label>
  <input type="text" placeholder="Enter Phone Number" name="phoneNumber" required />
</div>


        <div className="form-group">
          <label>Job Role</label>
          <input type="text" placeholder="Enter Job Role" name="jobRole" required />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input type="text" placeholder="Enter Department" name="department" required />
        </div>
        <div className="form-group clearfix">
          <button type="submit" className="signup-btn">
            Add
          </button>
        </div>
      </form>
      <div className="table">
      <h2>Employee Table</h2>
      <table>
        <thead>
          <tr>
            
            <th>Name</th>
            <th>ID</th>
              <th>RFID No</th>
            <th>Phone Number</th>
            <th>Building</th>
            <th>Job Role</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.EID}>
              <td>{d.name}</td>
              <td>{d.EID}</td>
              <td>{d.RFID_no}</td>
              <td>{d.phone_no}</td>
              <td>{d.department}</td>
              <td>{d.building}</td>
              <td>{d.role}</td>
              <td>
                
                <button className='btn-primary'>Update</button>
                <button className='btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
    </div>
  );
};

export default AddEmployee;
