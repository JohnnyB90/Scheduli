const router = require('express');
const appointmentRoutes = require('./appointmentRoutes');

router.use('/appointment_details', appointmentRoutes);