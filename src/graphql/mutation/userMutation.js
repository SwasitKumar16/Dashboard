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
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      message
      status
      id
      token
    }
  }
`;
export const REGISTER_ADMIN_MUTATION = gql`
  mutation RegisterAdmin($input: RegisterAdminInput!) {
    registerAdmin(input: $input) {
      admin_id
      email
    }
  }
`;
export const LOGIN_ADMIN_MUTATION = gql`
  mutation LoginAdmion($input: LoginAdminInput!) {
    loginAdmin(input: $input) {
      message
      status
      admin_id
    }
  }
`;
export const EDIT_USER_MUTATION = gql`
  mutation EditUser($input: EditUserInput!) {
    editUser(input: $input) {
      message
      status
    }
  }
`;
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      message
      status
    }
  }
`;
