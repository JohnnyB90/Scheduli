const { AuthenticationError } = require("apollo-server-express");
const { User, Appointment } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async () => {
      try {
        const user = await User.findOne();
        console.log(user);
        return user;
      } catch (error) {
        throw new Error("Failed to fetch user data");
      }
    },
    appointments: async () => {
      return await Appointment.find();
    },
    appointment: async (_, { _id }) => {
      return await Appointment.findById(_id);
    },
  },
  Mutation: {
    createAppointment: async (_, args) => {
      const newAppointment = new Appointment({
        firstName: args.firstName,
        lastName: args.lastName,
        appointmentDate: args.appointmentDate,
        appointmentTime: args.appointmentTime,
        email: args.email,
        phone: args.phone,
        message: args.message,
      });

      const createdAppointment = await newAppointment.save();
      return createdAppointment;
    },
    deleteAppointment: async (_, { _id }) => {
      try {
        const deletedAppointment = await Appointment.findByIdAndDelete(_id);
        return deletedAppointment;
      } catch (error) {
        console.error("Error deleting appointment", error);
        throw new Error("Failed to delete appointment");
      }
    },

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
