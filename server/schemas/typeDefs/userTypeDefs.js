const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  type User {
    _id: ID
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
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
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
    ): User
    updateUser(
      _id: ID!
      email: String
      password: String
      phoneNumber: String
      businessName: String
      businessAddress: String
      zipCode: String
      city: String
      state: String
      country: String
    ): Auth
    deleteUser(_id: ID!): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = userTypeDefs;
