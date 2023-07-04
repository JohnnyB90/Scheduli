import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $phoneNumber: String
    $businessName: String
    $businessAddress: String
    $zipCode: String
    $city: String
    $state: String
    $country: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      businessName: $businessName
      businessAddress: $businessAddress
      zipCode: $zipCode
      city: $city
      state: $state
      country: $country
    ) {
      _id
      firstName
      lastName
      email
      phoneNumber
      businessName
      businessAddress
      zipCode
      city
      state
      country
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
