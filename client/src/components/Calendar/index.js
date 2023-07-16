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
import { Modal, Button } from "react-bootstrap";

import "./calendar.css";
import { event } from "jquery";

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
  const [modalShow, setModalShow] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
        console.log(data.appointments);
        return {
          id: appointment._id,
          title: `${appointment.firstName} ${appointment.lastName}`,
          start: startDate,
          end: endDate,
          name: `${appointment.firstName} ${appointment.lastName}`,
          email: `${appointment.email}`,
          phoneNumber: `${appointment.phone}`,
          appointmentDate: `${appointment.appointmentDate}`,
          appointmentTime: `${appointment.appointmentTime}`,
          message: `${appointment.message}`,
        };
      });

      setEvents(eventsData);
    }
  }, [data]);

  useEffect(() => {
    // Refresh the calendar after creating or deleting an appointment
    refetch();
  }, [refetch]);

  const handleEventClick = ({ event }) => {
    setEventToDelete(event);
    setModalShow(true);
  };

  const handleConfirm = async () => {
    try {
      await deleteAppointment({ variables: { id: eventToDelete.id } });
      setEvents((prevEvents) =>
        prevEvents.filter((e) => e.id !== eventToDelete.id)
      );
      setModalShow(false);
      setShowSuccessModal(true);

      // Redirect to another page after 2 seconds
      setTimeout(() => {
        // Perform the redirect here
        setShowSuccessModal(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting appointment", error);
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
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this event? A cancellation email will
          automatically be sent out to the client. <br />
          <strong>Name:</strong> {eventToDelete?.extendedProps?.name}<br />
          <strong>Email:</strong> {eventToDelete?.extendedProps?.email}<br />
          <strong>Phone Number:</strong>{eventToDelete?.extendedProps?.phoneNumber}<br />
          <strong> Appointment Date:</strong> {eventToDelete?.extendedProps?.appointmentDate} @ {eventToDelete?.extendedProps?.appointmentTime}<br />
          <strong>Message:</strong> {eventToDelete?.extendedProps?.message}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            type="submit"
            className="custom-btn"
            onClick={() => setModalShow(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="custom-btn"
            onClick={handleConfirm}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Appointment successfully deleted. Redirecting...
        </Modal.Body>
      </Modal>
      <FullCalendar {...calendarConfig} />
    </div>
  );
}
