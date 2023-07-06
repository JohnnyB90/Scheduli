const router = require('express').Router();
const appointmentRoutes = require('./appointmentRoutes');
const signupRoutes = require('./signupRoutes');
const loginRoutes = require('./loginRoutes');

router.use('/appointment_details', appointmentRoutes);
router.use('/sign-up', signupRoutes);
router.use('/login', loginRoutes); 

module.exports = router;
