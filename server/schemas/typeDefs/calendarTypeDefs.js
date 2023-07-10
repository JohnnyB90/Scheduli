// calendarTypeDefs.js

const { gql } = require("apollo-server-express");

const calendarTypeDefs = gql`
  type Query {
    appointments: [Appointment]
    appointment(id: ID!): Appointment
  }

  type Appointment {
    id: ID!
    firstName: String!
    lastName: String!
    date: String!
    time: String!
    email: String!
    phone: String!
    message: String!
  }

  extend type Mutation {
    createAppointment(
      firstName: String!
      lastName: String!
      date: String!
      time: String!
      email: String!
      phone: String!
      message: String!
    ): Appointment!
  }
`;

module.exports = calendarTypeDefs;
