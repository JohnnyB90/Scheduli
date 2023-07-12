const { gql } = require("apollo-server-express");

const calendarTypeDefs = gql`
  scalar DateTime

  type Query {
    appointments: [Appointment]
    appointment(_id: ID!): Appointment
  }

  type Appointment {
    _id: ID!
    firstName: String!
    lastName: String!
    appointmentDate: String!
    appointmentTime: String!
    email: String!
    phone: String!
    message: String!
  }

  extend type Mutation {
    createAppointment(
      firstName: String!
      lastName: String!
      appointmentDate: String!
      appointmentTime: String!
      email: String!
      phone: String!
      message: String!
    ): Appointment!
    deleteAppointment(_id: ID!): Appointment
  }
`;

module.exports = calendarTypeDefs;
