// calendarRoutes.js

const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

// GET all appointments
router.get('/calendar-display', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    const events = appointments.map((appointment) => {
      return {
        id: appointment._id, // Use the appointment's _id as the event id
        title: `${appointment.firstName} ${appointment.lastName}`,
        start: appointment.start,
        end: appointment.end,
        name: appointment.firstName,
        email: appointment.email,
        phone: appointment.phone,
        specialMessage: appointment.message,
      };
    });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
