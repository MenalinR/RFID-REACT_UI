// Meetings.js

import React, { useState, useEffect } from 'react';
import '../components/log.css'; // Import the CSS file for styling

const Log = () => {
  const [meetingDetails, setMeetingDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, ] = useState([]);

  useEffect(() => {
    // Fetch meetings data from your backend API
    fetch('http://localhost:8000/getAllMeetingDetails')
      .then((response) => response.json())
      .then((data) => setMeetingDetails(data))
      .catch((error) => console.error('Error fetching meetings:', error));
  }, []);

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
    <div className='meet'>
      <div className="meetings-container">
        <div className='title'>
          <h2>Meeting Details</h2>
          <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        </div>
        <table>
          <thead>
            <tr>
              <th>Scheduled Date</th>
              <th>Meeting Date</th>
              <th>Participant</th>
              <th>In Time</th>
              <th>Meeting Topic</th>
              <th>Start Time</th>
              <th>End Time</th> 
              <th>Meeting Organizer</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(meetingDetails) && meetingDetails.map((meeting, index) => (
              <tr key={index}>
                <td>{meeting.scheduledDate}</td>
                <td>{meeting.meetingDate}</td>
                <td>{meeting.participant}</td>
                <td>{meeting.inTime}</td>
                <td>{meeting.meetingTopic}</td>
                <td>{meeting.startTime}</td>
                <td>{meeting.endTime}</td>
                <td>{meeting.meetingOrganizer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Log;
