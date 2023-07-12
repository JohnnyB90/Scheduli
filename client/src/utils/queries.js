import { gql } from '@apollo/client';

export const GET_ALL_APPOINTMENTS = gql`
  {
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
;`

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
;`

export const QUERY_USER = gql`
  query getUser{
    user {
      _id
      firstName
      lastName
      email
    }
  }
`;
