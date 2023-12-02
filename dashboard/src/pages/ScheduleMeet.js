// ScheduleMeeting.js

import React from 'react';
import '../components/ScheduleMeet.css';

const ScheduleMeet = () => {
  return (
    <section className="container">
      <h4>Meeting Schedule</h4>
      <hr></hr>
      <form action="#" className="form">
        <div className="input-box">
          <label>Meeting Topic</label>
          <input type="text" placeholder="Enter the topic of the meeting" required />
        </div>
        <div className="input-box">
          <label>Participants</label>
          <select multiple id="participantIds" name="participantIds[]" required>
            {/* You can dynamically populate this dropdown with participant IDs from your backend */}
            <option value="1">Participant 1</option>
            <option value="2">Participant 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="input-box">
          <label>Date</label>
          <input type="date" id="meetingDate" name="meetingDate" required />
        </div>
        <div className="input-box">
          <br></br>
          <label>Meeting Time</label>
          <br></br>
          <div className="column">
            <div className="time">
            <label htmlFor="startTime">Start Time:</label>
            <input type="time" id="startTime" name="startTime" />
            <label htmlFor="endTime">End Time:</label>
            <input type="time" id="endTime" name="endTime" />
            </div>
            <label htmlFor="duration">Duration (minutes):</label>
            <input type="text" id="duration" name="duration" />
          </div>
        </div>
        <div className="button">
          <button type="submit">Schedule</button>
        </div>
      </form>
    </section>
  );
};

export default ScheduleMeet;
