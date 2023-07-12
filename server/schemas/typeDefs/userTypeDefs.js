const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    businessName: String!
    businessAddress: String!
    zipCode: String!
    city: String!
    state: String!
    country: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
    appointments: [Appointment]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      phoneNumber: String!
      businessName: String!
      businessAddress: String!
      zipCode: String!
      city: String!
      state: String!
      country: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      phoneNumber: String
      businessName: String
      businessAddress: String
      zipCode: String
      city: String
      state: String
      country: String
    ): User
    deleteUser(_id: ID!): User
    login(email: String!, password: String!): Auth
    updatePassword(
      currentPassword: String!
      newPassword: String!
      confirmPassword: String!
    ): User
  }
`;

module.exports = userTypeDefs;
