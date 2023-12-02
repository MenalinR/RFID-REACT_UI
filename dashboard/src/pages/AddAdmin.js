
import React from 'react';
import '../components/add.css';



const AddAdmin= () => {
  return (
    <section className="container">
      <h4 className="add">Add Admin</h4><hr></hr>
      <form action="#" className="form">
        <div className="input-box">
          <label>Admin Name</label>
          <input type="text" placeholder="Enter admin name" required />
        </div>
        <div className="input-box">
          <label>Password</label>
          <input type="password" placeholder="Enter password" required />
        </div>
        <div className="input-box">
          <label>Permissions</label>
          <select multiple id="permissions" name="permissions[]" required>
            {/* You can customize the options based on the specific permissions you want */}
            <option value="create">Create</option>
            <option value="read">Read</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
          </select>
        </div>
        <div className="button">
          <button type="submit">Add </button>
        </div>
      </form>
    </section>
  );
};

export default AddAdmin;
