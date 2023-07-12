const { AuthenticationError } = require("apollo-server-express");
const { User, Appointment } = require("../models"); // Import the Appointment model
const { signToken, authMiddleware } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    user: async () => {
      return await User.find().populate("Appointments");
    },
    appointments: async () => {
      return await Appointment.find().populate("user");
    },
    appointment: async (_, { id }) => {
      return await Appointment.findById(id).populate("user");
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
    updatePassword: async (_, { currentPassword, newPassword }, context) => {
      console.log(context);
      
      await authMiddleware(context);

      const userId = context.user._id;

      if (!user) {
        throw new Error('You need to be logged in!');
      }

      const user = await User.findById(userId);

      const passwordMatch = await bcrypt.compare(currentPassword, user.password);

      if (!passwordMatch) {
        throw new Error('Current password is incorrect');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;

      await user.save();

      return user;
    },
  },
};

module.exports = resolvers;