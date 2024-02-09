import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsCalendarCheckFill } from "react-icons/bs";
import '../components/home.css';

const localizer = momentLocalizer(moment);

const Home = () => {
  const [events, setEvents] = useState([]);
  const [upcomingMeeting, setUpcomingMeeting] = useState(null);

  useEffect(() => {
    // Fetch scheduled meetings from the server
    axios.get('http://localhost:8000/ScheduleMeet')
      .then((res) => {
        // Transform the data to the format expected by react-big-calendar
        const transformedEvents = res.data.map((event) => {
          const startDate = new Date(event.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          });

          return {
            title: event.topic,
            start: moment(`${startDate} ${event.start_time}`, 'DD/MM/YYYY HH:mm:ss').toDate(),
            end: moment(`${startDate} ${event.end_time}`, 'DD/MM/YYYY HH:mm:ss').toDate(),
            tooltip: `Topic: ${event.topic}\nParticipants: ${event.Participants}\nOrganizer: ${event.scheduler}`,
          };
        });
        // Find and set the upcoming meeting
        const sortedEvents = transformedEvents.sort((a, b) => a.start - b.start);
        const upcoming = sortedEvents.find((event) => event.start > new Date());
        setUpcomingMeeting(upcoming);

        setEvents(transformedEvents);
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []); // Fetch events when the component mounts

  const customToastStyle = {
    width: 'auto', // Adjust the width as needed
    fontSize: '12px', // Adjust the font size as needed
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      fontSize: '15px',
    };

    return {
      style,
    };
  };

  const handleEventClick = (event) => {
    // Show event details in a toast
    toast.info(
      <div>
        <strong>Event Details:</strong>
        <br />
        <span>Title: {event.title}</span>
        <br />
        <span>Start Time: {moment(event.start).format('LLL')}</span>
        <br />
        <span>End Time: {moment(event.end).format('LLL')}</span>
        <br />
        <span>{event.tooltip}</span>
      </div>
    );
  };

  return (
    <div>
  {upcomingMeeting && (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    marginBottom:'7px',
    borderRadius: '10px',
    padding: '20px', // Increased padding for better spacing
    border: '0px solid #ddd', // Thicker border
    fontSize: '18px', // Larger font size
    width: '700px',
    marginTop:'10px',
    background:'white',
    boxShadow: '0 0 55px rgba(0, 0, 0, 1)', // Add a subtle shadow
    margin: '50px auto', // Center the element horizontally
  }}>
    <BsCalendarCheckFill style={{ fontSize: '36px', marginBottom: '10px', color: 'green' }} />
    <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Upcoming Meeting</h3>

    <div>
      <p style={{ marginBottom: '5px' }}>Title: {upcomingMeeting.title}</p>
      <p style={{ marginBottom: '5px' }}>Start Time: {moment(upcomingMeeting.start).format('LLL')}</p>
      <p style={{ marginBottom: '5px' }}>End Time: {moment(upcomingMeeting.end).format('LLL')}</p>
    </div>
  </div>
)}

<div className='cal'>
  <Calendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    style={{
      height: 450,
      width: 800,
      fontSize: 15,
      backgroundColor: 'white', // Change background color
      borderRadius: 10,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.9)', // Add a subtle shadow
      margin: '20px auto', // Center the element horizontally with a margin
    }}
    eventPropGetter={eventStyleGetter}
    onSelectEvent={handleEventClick}
    tooltipAccessor="tooltip"
  />
</div>

      <ToastContainer
        toastStyle={customToastStyle}
      />
    </div>
  );
};

export default Home;
