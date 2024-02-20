// AddEmployee.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../components/addemp.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineRefresh } from "react-icons/md";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoIosRadioButtonOff } from "react-icons/io";

const AddEmployee = () => {
  const [data, setData] = useState([]);
  const [name, setname] = useState('');
  const [EID, setEmployeeID] = useState('');
  const [, setRfidData] = useState('');
  const [phone_no, setPhoneNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [building, setBuilding] = useState('');
  const [role, setJobRole] = useState('');
  const [setShowModal] = useState(false);
  const [setModalMessage] = useState('');
  const eid = useRef('');
  const ename = useRef('');
  const no = useRef('');
  const pno = useRef('');
  const dep = useRef('');
  const bui = useRef('');
  const job = useRef('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [scanRFIDButton, setScanRFIDButton] = useState(false);
  const [RFID_no, setRFIDNo] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000');

    ws.onopen = function() {
      console.log('WebSocket Client Connected');
    };

    ws.onmessage = function(e) {
      var message = JSON.parse(e.data);
      console.log('Received: ', message);
      // Update the text box with the RFID data
      document.getElementById('rfidTextBox').value = message.rfidData;
      setRfidData(message.rfidData);
      setRFIDNo(message.rfidData);
    };

    ws.onerror = function(error) {
      console.error('WebSocket Error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // Fetch the initial scan button status from the backend
    axios.get('http://localhost:8000/getButtonStatus')
      .then(response => {
        const initialScanButtonStatus = response.data.scanButtonStatus;
        setScanRFIDButton(initialScanButtonStatus);
      })
      .catch(error => {
        console.error('Error fetching initial scan button status:', error);
      });
  
    // Fetch your employee data or other initial data here
    axios.get('http://localhost:8000/AddEmployee')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch(err => console.log(err));

      return () => {
        // Make an HTTP request to update the button press status when leaving the page
        axios.post('http://localhost:8000/updateButtonStatus', {
          scanButtonStatus: false, // Set to the desired value when leaving the page
        })
          .then(response => {
            console.log('Button status updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating button status:', error);
          });
      };
  }, []); // Empty dependency array to ensure the effect runs only once during component mount
  

  const customToastStyle = {
    width: 'auto',
    fontSize: '14px',
  };

  const handleScanRFID = () => {
    // Make an HTTP request to update the button press status
    axios.post('http://localhost:8000/updateButtonStatus', {
      scanButtonStatus: !scanRFIDButton,
    })
      .then(response => {
        console.log('Button status updated:', response.data);
  
      })
      .catch(error => {
        console.error('Error updating button status:', error);
      });
  };
  
  
  

  const handleDelete = (EID) => {
    axios.delete(`http://localhost:8000/DeleteEmployee/${EID}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          toast.success('Record deleted successfully');

          axios.get('http://localhost:8000/AddEmployee')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
        } else {
          console.error('Error deleting employee:', response.data);
        }
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };


  
  const handleReset = () => {
    // Clear form data and permissions
    setEmployeeID('');
    setRfidData('');
    setPhoneNumber('');
    setDepartment('');
    setBuilding('');
    setJobRole('');
    
    // Clear input values using refs
    eid.current.value = "";
    ename.current.value = "";
    no.current.value = "";
    pno.current.value = "";
    dep.current.value = "";
    bui.current.value = "";
    job.current.value = "";

    // Additional reset logic if needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    eid.current.value = "";
    ename.current.value = "";
    no.current.value = "";
    pno.current.value = "";
    dep.current.value = "";
    bui.current.value = "";
    job.current.value = "";

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
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          toast.success('Record saved successfully');
          setRFIDNo('');

          axios.get('http://localhost:8000/AddEmployee')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
        } else {
          console.error('Error adding employee:', response.data);
        }
      })
      .catch(error => {
        console.error('Error adding employee:', error);
      });
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filtered = data.filter(d =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleRefresh = () => {
    axios.get('http://localhost:8000/AddEmployee')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch(err => console.log(err));
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
          <input
            type="text"
            id="rfidTextBox"
            ref={no}
            placeholder=" RFID"
            name="RFID_no"
            value={RFID_no} // Use state to manage the value
            readOnly // Make the input read-only
          />
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
          <input type="text" ref={bui} placeholder="Enter block no" name="building" required
          maxLength={1}
          onChange={e => setBuilding(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Job Role</label>
          <input type="text" ref={job} placeholder="Enter Job Role" name="role" required 
          onChange={e => setJobRole(e.target.value)}/>
        </div>
        <button
  type="button"
  className="scan-btn"
  onClick={() => {
    setScanRFIDButton(!scanRFIDButton);
    handleScanRFID();
  }}
>{scanRFIDButton ? 'scan button is on' : 'scan button is off'}
{scanRFIDButton ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />}

</button>

        <div className="form-group clearfix">
          <button type="submit" className="signup-btn">
            Add
          </button>

          <button type="button" onClick={handleReset} className="reset-btn" >
            Reset
          </button>
          {/* <space direction="horizontal" size={12}></space>
          <button type="button" className="reset-btn" onClick={handleReset}>
  Reset
</button> */}

        </div>
      </form>

      <div className="table">
        <h2>Employee Table</h2>
        <span className="refresh-icon" onClick={handleRefresh}>
        <MdOutlineRefresh />
        </span>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
       
        <table className="emp">
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

          <tbody>
            {filteredData.map((d) => (
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