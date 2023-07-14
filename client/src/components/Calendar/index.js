import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format, parse, addMinutes } from "date-fns";
import jwt_decode from "jwt-decode";
import authService from "../../utils/auth";
import { GET_ALL_APPOINTMENTS } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "graphql-tag";

import "./calendar.css";

const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment($id: ID!) {
    deleteAppointment(_id: $id) {
      _id
    }
  }
`;

export default function MyCalendar() {
  const [userId, setUserId] = useState(() => {
    // Get the token from authService
    const token = authService.getToken();

    // Decode the token to get the user ID
    const decodedToken = jwt_decode(token);
    const userIdInit = decodedToken.data._id;

      return userIdInit;
  });

  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Get the token from authService
    const token = authService.getToken();

    // Decode the token to get the user ID
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.data._id;

    setUserId(userId);
  }, []);

  // Use the userId variable in the useQuery hook
  const { loading, error, data, refetch } = useQuery(GET_ALL_APPOINTMENTS, {
    variables: { userId },
  });

  console.log(data); // Check if data is undefined or has a value

  useEffect(() => {
    if (data && data.appointments) {
      const eventsData = data.appointments.map((appointment) => {
        const startDate = parse(
          `${appointment.appointmentDate} ${appointment.appointmentTime}`,
          "MM/dd/yyyy hh:mm a",
          new Date()
        );
        const endDate = addMinutes(startDate, 30);

        return {
          id: appointment._id,
          title: `${appointment.firstName} ${appointment.lastName}`,
          start: startDate,
          end: endDate,
        };
      });

      setEvents(eventsData);
    }
  }, [data]);

  useEffect(() => {
    // Refresh the calendar after creating or deleting an appointment
    refetch();
  }, [refetch]);

  const handleEventClick = async ({ event }) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (shouldDelete) {
      try {
        await deleteAppointment({ variables: { id: event.id } });
        setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
      } catch (error) {
        console.error("Error deleting appointment", error);
      }
    }
  };

  const calendarConfig = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    events,
    eventClick: handleEventClick,
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="calendar-container" style={{ paddingTop: 15 }}>
      <FullCalendar {...calendarConfig} />
    </div>
  );
}
