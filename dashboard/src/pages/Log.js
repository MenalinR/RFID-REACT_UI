// Meetings.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/log.css'; // Import the CSS file for styling
import { MdOutlineRefresh } from "react-icons/md";

// Update the Log component to initialize filteredData as an array
// ... (imports and other code)

const Log = () => {
  const [, setData] = useState([]);
  const [meetingDetails, setMeetingDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch meetings data from your backend API
    axios.get('http://localhost:8000/getAllMeetingDetails')
      .then((response) => {
        console.log('Received data from server:', response.data); // Add this log
        setMeetingDetails(response.data);
        setFilteredData(response.data); // Initialize filteredData with all data
      })
      .catch((error) => console.error('Error fetching meetings:', error));
  }, []);
  
  

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  
    if (searchTerm.trim() === '') {
      // If search term is empty, set filteredData to the entire meetingDetails array
      setFilteredData(meetingDetails);
    } else {
      // Otherwise, perform the filtering
      const filtered = meetingDetails.filter(d =>
        Object.values(d).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  };
  

  const handleRefresh = () => {
    axios.get('http://localhost:8000/getAllMeetingDetails')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='meet'>
      <div className="meetings-container">
        <div className='title'>
          <h2>Meeting Details</h2>
          <span className="refresh-icon" onClick={handleRefresh}>
        <MdOutlineRefresh />
        </span>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table className='em'>
          <thead>
            <tr>
           
            <th>Participant</th>
            <th>RFID</th>
            <th>In Time</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Meeting Date</th>
            <th>Scheduled Date</th>
            <th>Meeting Topic</th>
            <th>Meeting Organizer</th>
              
            </tr>
          </thead>
          <tbody>
  {Array.isArray(filteredData) && filteredData.length > 0 ? (
    filteredData.map((d) => (
      <tr key={d.RFID_no}>
        <td>{d.name}</td> 
        <td>{d.rfid_no}</td> 
        <td>{d.inTIME}</td>
        <td>{d.start_time}</td>
        <td>{d.end_time}</td>
        <td>
                  {new Date(d.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })}
                </td>
         <td>
                  {new Date(d.schldate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })}
                </td>
        <td>{d.topic}</td> 
        <td>{d.scheduler}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8">No data available</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default Log;
