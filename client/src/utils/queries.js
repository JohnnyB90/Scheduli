import { gql } from '@apollo/client';

export const GET_ALL_APPOINTMENTS = gql`
  {
    appointments {
      _id
      firstName
      lastName
      email
      phone
      message
    }
  }
;`

export const GET_ONE_APPOINTMENT = gql`
  {
    appointment(id: $appointmentId) {
      _id
      firstName
      lastName
      email
      phone
      message
    }
  }
;`

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      email
    }
  }
`;
