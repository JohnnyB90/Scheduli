import { gql } from '@apollo/client';



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
