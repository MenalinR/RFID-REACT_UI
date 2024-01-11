// Meetings.js

import React, {  useEffect } from 'react';
import '../components/log.css'; // Import the CSS file for styling

const Log = () => {
 

  useEffect(() => {
    // Fetch meetings data from your backend API
    fetch('your-api-url/meetings')
      .then((response) => response.json())
     
      .catch((error) => console.error('Error fetching meetings:', error));
  }, []);

  return (
    <div className='meet'>
    <div className="meetings-container">
        <div className='title'>
      <h2>Meeting Details</h2>
      </div>
      <table>
        <thead>
          <tr>
          <th>Scheduled Date</th>
            <th>Meeting Date</th>
            <th>Participants</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Meeting Topic</th>
            <th>Meeting Organizer</th>
          </tr>
        </thead>
        <tbody>
           
            <tr >
            <th>27/11/2023</th>
              <td>1/12/2023</td>
              <td>Emp1,Emp2</td>
              <td>1.00pm</td>
              <td>2.00pm</td>
              <td>project progress</td>
              <th>Menalin</th>
            </tr>
          
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Log;
