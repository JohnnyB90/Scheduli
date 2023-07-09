import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calendar.css';

export default function MyCalendar() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch('/calendar-display')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched events:', data);
        setEvents(data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  const eventContent = ({ event }) => {
    const handleEventClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const details = `Name: ${event.extendedProps.name}\nEmail: ${event.extendedProps.email}\nPhone: ${event.extendedProps.phone}\n\n${event.extendedProps.specialMessage}`;
      alert(details);
    };

    const handleDeleteClick = (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Make a DELETE request to delete the event on the backend
      fetch(`/api/events/${event.id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Event deleted on the backend:', data);

          // Remove the event from the calendar
          event.remove();
        })
        .catch((error) => {
          console.error('Error deleting event on the backend:', error);
        });
    };

    return (
      <div className="event-content" onClick={handleEventClick}>
        <div className="event-title">{event.title}</div>
        <div className="event-delete" onClick={handleDeleteClick}>
          X
        </div>
      </div>
    );
  };

  const calendarConfig = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    events: events,
    eventContent: eventContent,
    slotMinTime: '08:00:00', // Set the minimum time to 8 am
    slotMaxTime: '21:00:00', // Set the maximum time to 8 pm
  };
  

  return (
    <div className="calendar-container">
      <FullCalendar {...calendarConfig} ref={calendarRef} />
    </div>
  );
};