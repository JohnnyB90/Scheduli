const router = require('express').Router();
const { Appointment } = require('../../models');
const withAuth = require('../../utils/auth');

const nodeMailer = require('nodemailer');
require('dotenv').config();

router.post('/', withAuth, async (req, res) => {
    try {
        const newAppointment = await Appointment.create({
            // To be continued...
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        });
        let transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD,
              clientId: process.env.OAUTH_CLIENTID,
              clientSecret: process.env.OAUTH_CLIENT_SECRET,
              refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
          });

          let mailOptions = {
            from: 'scheduli@gmail.com',
            to: req.body.email,
            subject: 'Haircut Appointment',
            // Text will show the user an email with information about the appointment made
            text: `You created an appointment for`
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