import React, { useState } from 'react';

const RemoveAdmin= () => {
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
    <form align="center" style={{ paddingTop: "20px" }}>
      Admin name:
      <input type="text" name="fname" id="fname" value={adminData.adminName} /><br /><br />
      Password:
      <input type="text" name="lname" id="lname" value={adminData.password} /><br /><br />
      Permissions:
      <input type="text" name="age" id="age" value={adminData.permissions} /><br /><br />
      <button onClick={handleRemoveAdmin}>Remove</button><br /><br />

      <table id="table" border="1" align="center">
        <thead>
          <tr>
            <th>Admin name</th>
            <th>Password</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over your admin data array and display rows */}
          {/* Set the handleRowClick function for each row */}
          {/* You can replace this with your actual admin data array */}
          {[1, 2, 3].map((item, index) => (
            <tr key={index} onClick={() => handleRowClick(index)}>
              <td>{/* Replace with your actual admin name */}</td>
              <td>{/* Replace with your actual password */}</td>
              <td>{/* Replace with your actual permissions */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default RemoveAdmin;
