import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
mutation login($username: String! $password: String!) {
  login(input: {
      identifier: $username
      password: $password
  }) {
    user {
      id
    	email
      username
    }
    jwt
  }
}
`;

export const SIGNUP_MUTATION = gql`
mutation signup($username: String! $password: String!) {
  register(input: {
    	email: $username
    	username: $username
      password: $password
  }) {
    user {
      id
    	email
      username
    }
    jwt
  }
}`;
