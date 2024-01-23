import React, { useState,useRef } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import '../components/add.css';
import { FaUser } from "react-icons/fa6";

const AddAdmin = () => {
  const [permissions, setPermissions] = useState([]);
  const [name, setname] = useState('');
  const [password, setpass] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const an =useRef('');
  const pa =useRef('');
  const pe =useRef('');

  const handleCheckboxChange = (event) => {
    const permissionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      // If the checkbox is checked, add the value to the selected permissions
      setPermissions((prevPermissions) => [...prevPermissions, permissionValue]);
    } else {
      // If the checkbox is unchecked, remove the value from the selected permissions
      setPermissions((prevPermissions) =>
        prevPermissions.filter((value) => value !== permissionValue)
      );
    }
  };

  console.log('Selected Permissions:', permissions);

  const handleCloseModal = () => {
    setShowModal(false);
    // You can perform additional actions after closing the modal if needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


   
    try {
      // Make a POST request to add admin data
      const response = await axios.post('http://localhost:8000/AddAdmin/', {
            name,
            password,
            permissions,
});


  // Handle the response as needed
  if (response.data.success) {
    const successMessage = 'Admin added successfully: ' + response.data.result;
    setModalMessage(successMessage);
    setShowModal(true);

    setname('');
    setpass('');
    setPermissions([]);
    // You can fetch the updated list of admins here if needed
    // Example: axios.get('http://localhost:8000/GetAdmins').then(res => setAdmins(res.data));
  } else {
    const errorMessage = 'Error adding admin: ' + response.data.error;
    setModalMessage(errorMessage);
    setShowModal(true);
    console.error(errorMessage);
  }
} catch (error) {
  const errorMessage = 'Error adding admin: ' + error.message;
  setModalMessage(errorMessage);
  setShowModal(true);
  console.error(errorMessage);
}
}

  return (
    <section className="co">
      <div className='user'>
      <FaUser />
      </div>
      <h4 className="add">ADD ADMIN</h4>
      <hr></hr>

      <form onSubmit={handleSubmit} className="frm">
        <div className="in">
          <label>Admin Name</label>
          <input
          ref={an}
            type="text"
            placeholder="Enter admin name"
            name="name"
            value={name} 
            required
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="in">
          <label>Password</label>
          <input
          ref={pa}
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            required
            onChange={(e) => setpass(e.target.value)}
          />
        </div>

        <div className="in">
      <label>Permissions:</label>
      <div className="checkbox-group" >
        {[
          { label: 'Manage User', value: 'manage_user' },
          { label: 'Schedule Meeting', value: 'schedule_meeting' },
          { label: 'Meeting Details', value: 'meeting_details' },
          { label: 'User Creation', value: 'user_creation' },
          { label: 'Log System Access', value: 'log' },
        ].map((permission) => (
          <div key={permission.value}>
            <label>
            {permission.label}
              <input
              ref={pe}
                type="checkbox"
                value={permission.value}
                onChange={handleCheckboxChange}
                checked={permissions.includes(permission.value)}
              />
              
            </label>
          </div>
        ))}
      </div>
    </div>

        <div  className='but'>
          <button type="submit">Add</button>
        </div>
      </form>
      <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Admin Addition Result</Modal.Title>
    </Modal.Header>
    <Modal.Body>{modalMessage}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
    </section>
  );
};

export default AddAdmin;