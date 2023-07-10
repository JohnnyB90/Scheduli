const router = require('express').Router();
const appointmentRoutes = require('./appointmentRoutes');


router.use('/appointment_details', appointmentRoutes);


module.exports = router;
