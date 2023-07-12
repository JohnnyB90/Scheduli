import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

import './calendar.css';

const GET_APPOINTMENTS = gql`
  query GetAppointments {
    appointments {
      _id
      appointmentDate
      appointmentTime
      firstName
      lastName
    }
  }
`;

const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment($id: ID!) {
    deleteAppointment(_id: $id) {
      _id
    }
  }
`;

export default function MyCalendar() {
  const { loading, error, data } = useQuery(GET_APPOINTMENTS);
  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (data) {
      const eventsData = data.appointments.map(appointment => ({
        id: appointment._id,
        title: `${appointment.firstName} ${appointment.lastName}`,
        start: new Date(appointment.appointmentDate),
        end: new Date(appointment.appointmentDate).setMinutes(30)
      }));
      console.log(eventsData);
      setEvents(eventsData);
    }
  }, [data]);

  const handleEventClick = async ({ event }) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this event?');
  
    if (shouldDelete) {
      await deleteAppointment({ variables: { id: event.id } });
      setEvents(prevEvents => prevEvents.filter(e => e.id !== event.id));
    }
  };  
  

  const calendarConfig = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    events,
    eventClick: handleEventClick,
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="calendar-container">
      <FullCalendar {...calendarConfig} />
    </div>
  );
}
