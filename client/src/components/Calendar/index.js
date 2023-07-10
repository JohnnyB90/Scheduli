import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calendar.css';

export default function MyCalendar() {

  

  const calendarConfig = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    slotMinTime: '08:00:00', // Set the minimum time to 8 am
    slotMaxTime: '21:00:00', // Set the maximum time to 8 pm
  };
  

  return (
    <div className="calendar-container">
      <FullCalendar {...calendarConfig}/>
    </div>
  );
};