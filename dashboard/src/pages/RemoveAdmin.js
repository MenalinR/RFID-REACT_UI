// RemoveAdmin.js

import React, { useState } from 'react';
import '../components/remove.css';

const RemoveAdmin = () => {
  const [adminData, setAdminData] = useState({
    adminName: '',
    password: '',
    permissions: '',
  });
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
    const selectedAdmin = {
      adminName: document.getElementById("fname").value,
      password: document.getElementById("lname").value,
      permissions: document.getElementById("age").value,
    };
    setAdminData(selectedAdmin);
  };

  const handleRemoveAdmin = () => {
    if (selectedRowIndex !== null) {
      // Remove the selected admin logic
      // You can use setAdminData to update the adminData state if needed
      console.log('Removing admin:', adminData);
    }
  };

  return (
    <div className="remove-admin-container">
      <table>
          <thead>
            <tr>
              <th>Admin name</th>
              <th>Password</th>
              
            </tr>
          </thead>
          <tbody>
            {/* Sample row, replace with your actual admin data */}
            <tr onClick={() => handleRowClick(0)}>
              <td>John Doe</td>
              <td>********</td>
              
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table><br></br>
      <form className="form">
        Admin name:
        <input type="text" name="fname" id="fname" value={adminData.adminName} /><br /><br />
        Password:
        <input type="text" name="lname" id="lname" value={adminData.password} /><br /><br />
        <div className="button">
        <button type="submit" onClick={handleRemoveAdmin}>Remove</button><br /><br />
        </div>
        
      </form>
    </div>
  );
};

export default RemoveAdmin;
