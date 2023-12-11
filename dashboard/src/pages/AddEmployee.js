// AddEmployee.js
import React from 'react';
import '../components/addemp.css';

const AddEmployee = () => {
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
          <input type="text" placeholder="Enter Employee Name" name="employeeName" required />
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
    </div>
  );
};

export default AddEmployee;
