const { AuthenticationError } = require("apollo-server-express");
const { User, Appointment } = require("../models");
const { signToken } = require("../utils/auth");
const nodeMailer = require('nodemailer');

const resolvers = {
  Query: {
    user: async (_, { userId }, ___) => {
      if (!userId) {
        throw new AuthenticationError("User ID not provided");
      }
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        throw new Error("Failed to fetch user data");
      }
    },

    appointments: async (_, { userId }) => {
      if (!userId) {
        throw new AuthenticationError("User ID not provided");
      }
      return await Appointment.find({ user: userId });
    },

    appointment: async (_, { _id }) => {
      return await Appointment.findById(_id);
    },
  },
  Mutation: {
    createAppointment: async (
      _,
      {
        userId,
        firstName,
        lastName,
        appointmentDate,
        appointmentTime,
        email,
        phone,
        message,
      },
      context
    ) => {
      // Now userId is directly from args
      if (!userId) {
        throw new AuthenticationError("User ID not provided");
      }

      try {
        // Find the user based on the userId
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        // Create the appointment and associate it with the user
        const appointment = new Appointment({
          user: userId,
          firstName,
          lastName,
          appointmentDate,
          appointmentTime,
          email,
          phone,
          message,
        });

        const createdAppointment = await appointment.save();

        // Create the transporter object using the default SMTP transport
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

        // Define email options
        const mailOptions = {
          from: process.env.REACT_APP_MAIL_USERNAME,
          to: email,
          subject: "Appointment Confirmation",
          text: `Hello ${firstName} ${lastName}, this is to confirm your appointment on ${appointmentDate} at ${appointmentTime}`,
        };

        // Send the email
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        return createdAppointment;
      } catch (error) {
        console.error("Error creating appointment", error);
        throw new Error("Failed to create appointment");
      }
    },
    deleteAppointment: async (_, { _id }) => {
      try {
        const appointmentToDelete = await Appointment.findById(_id);
        
        if (!appointmentToDelete) {
          throw new Error("Appointment not found");
        }
        
        const email = appointmentToDelete.email;
        const firstName = appointmentToDelete.firstName;
        const lastName = appointmentToDelete.lastName;
        const appointmentDate = appointmentToDelete.appointmentDate;
        const appointmentTime = appointmentToDelete.appointmentTime;
  
        const deletedAppointment = await Appointment.findByIdAndDelete(_id);
  
        // Create the transporter object using the default SMTP transport
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
  
        // Define email options
        const mailOptions = {
          from: process.env.REACT_APP_MAIL_USERNAME,
          to: email,
          subject: 'Appointment Cancellation Notice',
          text: `Hello ${firstName} ${lastName}, this is to inform you that your appointment on ${appointmentDate} @ ${appointmentTime} has been cancelled. Please feel free to give us a call to reschedule.`
        };
  
        // Send the email
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
  
        return deletedAppointment;
      } catch (error) {
        console.error("Error deleting appointment", error);
        throw new Error("Failed to delete appointment");
      }
    },
    updateUser: async (_, args, context) => {
      const { userId } = context;
      if (!userId) {
        throw new AuthenticationError("User ID not provided");
      }
    },
    addUser: async (parent, args) => {
      const { email } = args;
      // check if user with this email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("A user with this email already exists");
      }
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        // Create a new object to store the updated fields
        const updatedFields = {};

        // Iterate over the fields in args
        for (const field in args) {
          // Check if the field value is not an empty string
          if (args[field] !== "") {
            // Add the field and its value to the updatedFields object
            updatedFields[field] = args[field];
          }
        }

        // Perform the update only if there are non-empty fields to update
        if (Object.keys(updatedFields).length > 0) {
          return await User.findByIdAndUpdate(context.user._id, updatedFields, {
            new: true,
          });
        } else {
          // If there are no non-empty fields to update, return the existing user
          return context.user;
        }
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    updatePassword: async (_, { currentPassword, newPassword }, context) => {
      const userId = context.user._id;

      if (!userId) {
        throw new Error("You need to be logged in!");
      }

      const user = await User.findById(userId);

      const passwordMatch = await user.isCorrectPassword(currentPassword);

      if (!passwordMatch) {
        throw new Error("Current password is incorrect");
      }

      user.password = newPassword;

      await user.save();

      return user;
    },
  },
};

module.exports = resolvers;
