// MeetingTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/meetingtable.css';

const MeetingTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/ScheduleMeet')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (referenceKey) => {
    axios.delete(`http://localhost:8000/DeleteMeet/${referenceKey}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          // Fetch updated data after deleting a record
          axios.get('http://localhost:8000/ScheduleMeet')
            .then(res => {
              setData(res.data);
              setFilteredData(res.data);
            })
            .catch(err => console.log(err));
        } else {
          console.error('Error deleting meeting:', response.data);
        }
      })
      .catch(error => {
        console.error('Error deleting meeting:', error);
      });
  };

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
    <div className="meeting-table-container">

      <h5>Meeting Table</h5>
      <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />



      <div className="meeting-table-wrapper">
        
        <table className="meeting-table">
        <thead>
          <tr>
            <th>Reference Key</th>
            <th>Topic</th>
            <th>Participants</th>
            <th>Meeting Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Organizer</th>
            <th>Duration</th>
            <th>Scheduled Date </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.reference_key}>
            <td>{d.reference_key}</td>
              <td>{d.topic}</td>
              <td>{d.Participants}</td>
              <td>
                {new Date(d.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                })}
              </td>
              <td>{d.start_time}</td>
              <td>{d.end_time}</td>
              <td>{d.scheduler}</td>
              <td>{d.duration}</td>
              <td>
                {new Date(d.schldate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                })}
              </td>
              <td>
                <button onClick={() => handleDelete(d.reference_key)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingTable;
