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
        marginBottom: '20px',
        borderRadius: '10px',
        padding: '2px',
        border: '1px solid #ddd',
        fontSize: '15px',
        width: '700px',
        paddingBottom: '2px',
        background: 'white',
        marginLeft: '40px',
        marginTop:'1px',
        backgroundColor:'#f2ebeb',
        
      }}>
        <BsCalendarCheckFill />
        <h3 style={{ marginTop: '10px', fontSize: '20px' }}>Upcoming Meeting</h3>

        <div style={{ paddingTop: '1px' }}>
          <p>Title: {upcomingMeeting.title}</p>
          <p>Start Time: {moment(upcomingMeeting.start).format('LLL')}</p>
          <p>End Time: {moment(upcomingMeeting.end).format('LLL')}</p>
          
        </div>
      </div>
    )}
    <div className='cal'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 460, width:800, fontSize: 15, backgroundColor: '#f5f5f5', borderRadius: 10 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick}
        tooltipAccessor="tooltip" // Use the 'tooltip' property for the tooltip content
      />
    </div>
      <ToastContainer
        toastStyle={customToastStyle}
      />
    </div>
  );
};

export default Home;
