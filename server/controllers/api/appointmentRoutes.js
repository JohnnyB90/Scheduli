const router = require('express').Router();
const { Appointment } = require('../../models');
const withAuth = require('../../utils/auth');

const nodeMailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

router.use(cors());

router.post('/appointment_details', (req, res) => {
  const output = `
  <html>
  `
})

router.post('/', withAuth, async (req, res) => {
    try {
        const { email, firstName, lastName, phone, message } = req.body;

        const newAppointment = await Appointment.create({

            firstName: `${firstName}`,
            lastName: `${lastName}`,
            phone: `${phone}`,
            email: `${email}`,
            message: `${message}`
        });
        let transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: process.env.REACT_APP_MAIL_USERNAME,
              // pass: process.env.MAIL_PASSWORD,
              clientId: process.env.REACT_APP_OAUTH_CLIENTID,
              clientSecret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
              refreshToken: process.env.REACT_APP_OAUTH_REFRESH_TOKEN
            }
          });

          let mailOptions = {
            from: 'scheduli001@gmail.com',
            to: `${email}`,
            subject: 'Appointment Details',
            // Text will show the user an email with information about the appointment made
            text: `You created an appointment`,
            html: output
          };

          transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
              console.log('Error ' + err);
            } else {
              console.log('Email sent successfully');
            }
          });

        // if the user is successfully created, the new response will be returned as json
        res.status(200).json(newAppointment)

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;