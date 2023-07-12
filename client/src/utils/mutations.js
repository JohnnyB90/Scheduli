import { gql } from '@apollo/client';

export const CREATE_APPOINTMENT = gql`
  mutation createAppointment(
    $firstName: String!
    $lastName: String!
    $appointmentDate: String!
    $appointmentTime: String!
    $email: String!
    $phone: String!
    $message: String!
  ) {
    createAppointment(
      firstName: $firstName
      lastName: $lastName
      appointmentDate: $appointmentDate
      appointmentTime: $appointmentTime
      email: $email
      phone: $phone
      message: $message
    ) {
      _id
      firstName
      lastName
      appointmentDate
      appointmentTime
      email
      phone
      message
    }
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation deleteAppointment($id: ID!) {
    deleteAppointment(_id: $id) {
      _id
    }
  }
`;


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
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $businessName: String!
    $businessAddress: String!
    $zipCode: String!
    $city: String!
    $state: String!
    $country: String!
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
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $businessName: String!
    $businessAddress: String!
    $zipCode: String!
    $city: String!
    $state: String!
    $country: String!
  ) {
    addUser(
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
      token
      user {
        _id
      }
    }
  }
`;
