import { gql } from "@apollo/client";
const userSchema = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }
  type Admin {
    admin_id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    userId: Int!
  }
  input RegisterUserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }
  input RegisterAdminInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    userId: Int!
  }
  input LoginUserInput {
    email: String!
    password: String!
  }
  input LoginAdminInput {
    email: String!
    password: String!
  }
  input EditUserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
  }
  type Query {
    getUser(id: ID!): User
    listUsers: [User]
  }
  type UserResponse {
    message: String
    status: String
    id: Int
    token: String!
  }
  type AdminResponse {
    message: String
    status: String
    admin_id: Int
  }
  type EmptyResponse {
    message: String
    status: String
  }
  type Mutation {
    registerUser(input: RegisterUserInput!): User
    loginUser(input: LoginUserInput!): UserResponse
    registerAdmin(input: RegisterAdminInput!): Admin
    loginAdmin(input: LoginAdminInput!): AdminResponse
    editUser(input: EditUserInput!): EmptyResponse
    deleteUser(id: ID!): EmptyResponse
  }
`;
export default userSchema;
