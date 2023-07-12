const { AuthenticationError } = require("apollo-server-express");
const { User, Appointment } = require("../models"); // Import the Appointment model
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async () => {
      return await User.find().populate("Appointments");
    },
    appointments: async () => {
      return await Appointment.find();
    },
    appointment: async (_, { _id }) => {
      return await Appointment.findById(_id);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
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
          if (args[field] !== '') {
            // Add the field and its value to the updatedFields object
            updatedFields[field] = args[field];
          }
        }
    
        // Perform the update only if there are non-empty fields to update
        if (Object.keys(updatedFields).length > 0) {
          return await User.findByIdAndUpdate(context.user._id, updatedFields, { new: true });
        } else {
          // If there are no non-empty fields to update, return the existing user
          return context.user;
        }
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createAppointment: async (parent, args) => {
      const appointment = await Appointment.create(args);
      return appointment;
    },    
    deleteAppointment: async (_, { _id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to delete appointments!');
      }
    
      const appointment = await Appointment.findById(_id);
    
      if (!appointment) {
        throw new Error('Appointment not found');
      }
    
      if (appointment.user.toString() !== context.user._id) {
        throw new AuthenticationError('You can only delete your own appointments!');
      }
    
      await appointment.remove();
      return appointment;
    },    
  },
};

module.exports = resolvers;
