import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  query LoginUser($input: LoginUserInput) {
    loginUser(input: $input) {
      status {
        status
        accessToken
        message
      }
      data {
        _id
        name
        surname
        email
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($input: LoginUserInput) {
    getUser(input: $input) {
      status {
        message
        status
      }
      data {
        email
        surname
        name
        _id
      }
    }
  }
`;
