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
  input RegisterUserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }
  input LoginUserInput {
    email: String!
    password: String!
  }
  type Query {
    getUser(id: ID!): User
    listUsers: [User]
  }
  type EmptyResponse {
    message: String
    status: String
    id: Int
  }
  type Mutation {
    registerUser(input: RegisterUserInput!): User
    loginUser(input: LoginUserInput!): EmptyResponse
  }
`;
export default userSchema;
