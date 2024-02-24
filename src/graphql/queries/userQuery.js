import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      firstName
      lastName
      username
      email
    }
  }
`;
