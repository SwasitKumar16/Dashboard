import { gql } from "@apollo/client";

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      email
    }
  }
`;
export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($input: RegisterUserInput!) {
    loginUser(input: $input) {
      message
      status
    }
  }
`;
