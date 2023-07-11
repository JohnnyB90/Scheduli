// MyCalendar.js

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
      setEvents(data.appointments.map(a => ({
        _id: a.id,
        title: `${a.firstName} ${a.lastName}`,
        start: `${a.appointmentDate}T${a.appointmentTime}`,
      })));
    }
  }, [data]);
  
  const handleEventClick = async ({ event }) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this event?');

    if (shouldDelete) {
      await deleteAppointment({ variables: { _id: event.id } });
      setEvents(events.filter(e => e.id !== event.id));
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
    slotMinTime: '08:00:00',
    slotMaxTime: '21:00:00',
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="calendar-container">
      <FullCalendar {...calendarConfig} />
    </div>
  );
}
