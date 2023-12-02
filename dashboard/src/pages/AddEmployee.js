// AddEmployee.js
import React from 'react';

const AddEmployee = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc' }}>
        <div className="container">
          <p>Create an employee</p>
          <hr />

          <label htmlFor="employeeName"><b>Employee Name</b></label>
          <input type="text" placeholder="Employee Name" name="employeeName" required />

          <label htmlFor="employeeID"><b>Employee ID</b></label>
          <input type="text" placeholder="Enter ID" name="employeeID" required />

          <label htmlFor="jobRole"><b>Job Role</b></label>
          <input type="text" placeholder="Enter Job Role" name="jobRole" required />

          <label htmlFor="department"><b>Department</b></label>
          <input type="text" placeholder="Enter Department" name="department" required />

          <div className="clearfix">
            <button type="submit" className="signupbtn">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
