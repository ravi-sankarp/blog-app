import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    userName: String!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    createdOn: String!
  }

  type Comments {
    id: ID!
    comment: String!
    createdOn: String!
    postedBy: String!
  }

  type Category {
    id: ID!
    title: String!
    description: String!
  }

  type Post {
    id: ID!
    authorId: ID!
    title: String!
    content: String!
    tags: [String!]
    categoryId: String!
    totalComments: Int!
    comments: [Comments!]
  }

  type Token {
    token: String
  }
  type Query {
    login(data: userLogin): Token!
    getUserDetails:User!
  }

  type Mutation {
    register(data: userRegister!): Token!
    
  }

  input userLogin {
    email: String!
    password: String!
  }

  input userRegister {
    email: String!
    userName: String!
    firstName: String!
    lastName: String!
    password: String!
    confirmPassword: String!
    phoneNumber: String!
  }
`;
