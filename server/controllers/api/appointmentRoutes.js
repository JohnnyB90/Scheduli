require('dotenv').config();
const router = require('express').Router();
const nodeMailer = require('nodemailer');
const debug = require('debug')('app:email');
const cors = require('cors');
const { Appointment } = require('../../models');

router.use(cors());


// Nodemailer setup
let transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.REACT_APP_MAIL_USERNAME,
    clientId: process.env.REACT_APP_OAUTH_CLIENTID,
    clientSecret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
    refreshToken: process.env.REACT_APP_OAUTH_REFRESH_TOKEN,
  },
});
console.log(transporter);

router.post('/', async (req, res) => {
  try {
    const { email, firstName, lastName, phone, message } = req.body;

    const newAppointment = await Appointment.create({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    const output = `
      <html>
        <body>
          <h1>Appointment Details</h1>
          <p>Name: ${firstName}${lastName}</p>
          <p>Email: ${email}</p>
          <p>Phone: ${phone}</p>
          <p>Check-in Time: </p>
          <p>Message: ${message}</p>
        </body>
      </html>
    `;

    let mailOptions = {
      from: process.env.REACT_APP_MAIL_USERNAME, // Use the same sender email as the transporter
      to: email,
      subject: 'Appointment Details',
      text: 'Thank you',
      html: output,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Error:', err);
        res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent successfully');
        res.status(200).json(newAppointment);
      }
    });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ message: 'Error creating appointment' });
  }
});

module.exports = router;

