import { gql } from '@apollo/client';

export const GET_ALL_APPOINTMENTS = gql`
  query {
    appointments {
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

export const GET_ONE_APPOINTMENT = gql`
  query appointment($id: ID!) {
    appointment(_id: $id) {
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


export const QUERY_USER = gql`
query getUser($userId: ID!) {
  user(userId: $userId) {
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

