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

const StrategyFragment = gql`
fragment StrategyFragment on ComponentCompanyStrategy {
  id
  preseed
  seed
  seriesA
  seriesB
  seriesC
}
`


export const REGISTER_COMPANY_MUTATION = gql`

mutation registerCompany($name: String! $strategy: JSON!) {
  registerCompany(name: $name strategy: $strategy) {
    id
    name
    user {
      id
      email
    }
    strategy {
      ...StrategyFragment
    }
    createdAt
  }
}
${StrategyFragment}
`;
