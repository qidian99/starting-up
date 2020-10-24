import { gql } from '@apollo/client'


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


const RegionFragment = gql`
fragment RegionFragment on Region {
  id
  population
  conversionRate
  leavingRate
  revenue
  cost
  growth
}`;

const FundingFragment = gql`
fragment FundingFragment on Funding {
	id
  amount
  cycle
  threshold
}`;

const UserFragment = gql`
fragment UserFragment on UsersPermissionsUser {
  id
  username
}`;


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

export const REGISTER_COMPANY_MUTATION = gql`

mutation registerCompany($name: String! $strategy: SimpleStrategyInput!) {
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

export const CREATE_SIMPLE_GAME_MUTATION = gql`
mutation createSimpleGame {
  createSimpleGame {
    id
    name
    width
    height
    numCycles
    cycle
    numCompanies
    companies {
      id
      name
      strategy {
        ...StrategyFragment
      }
    }
    started
    update {
      ...on ComponentGameRegionUpdate {
        RegionUserUpdate {
          user {
            ...UserFragment
          }
          count
        }
      }
      ...on ComponentGameCompanyUpdate {
        CompanyUserUpdate {
          user {
            ...UserFragment
          }
          revenue
          bankrupt
        }
      }
      ...on ComponentGameFundingUpdate {
        FundingUserUpdate {
          user {
            ...UserFragment
          }
          funding {
            name
            amount
          }
        }
      }
    }
    status {
      GameUserStatus {
        user {
          ...UserFragment
        }
        revenue
        bankrupt
        connected
      }
    }
    fundings {
      ...FundingFragment
    }
    regions {
      ...RegionFragment
    }
  }
}
${StrategyFragment}
${RegionFragment}
${FundingFragment}
${UserFragment}
`



