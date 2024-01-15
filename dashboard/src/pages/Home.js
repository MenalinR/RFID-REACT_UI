import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localizer = momentLocalizer(moment);


// ... (import statements)

const Home = () => {
  const [events, setEvents] = useState([]);

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
    
      console.log('Transformed Events:', transformedEvents);
    
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
      fontSize: '15px'
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
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 , fontSize:15, backgroundColor: '#f5f5f5',borderRadius:10 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick}
        tooltipAccessor="tooltip" // Use the 'tooltip' property for the tooltip content
        
      />
      <ToastContainer
        toastStyle={customToastStyle}
      />
    </div>
  );
};

export default Home;
