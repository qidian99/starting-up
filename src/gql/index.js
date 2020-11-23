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
  index
}`;

const CompanyFragment = gql`
fragment CompanyFragment on Company {
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
${StrategyFragment}`;

const CompanyFragmentTiny = gql`
fragment CompanyFragmentTiny on Company {
  id
  name
}`;

const FundingFragment = gql`
fragment FundingFragment on Funding {
	id
  name
  amount
  cycle
  threshold
}`;

const UserFragment = gql`
fragment UserFragment on UsersPermissionsUser {
  id
  username
}`;

const GameFragment = gql`
fragment GameFragment on Game {
  id
  name
  started
  finished
  width
  height
  numCycles
  cycle
  numCompanies
  companies {
    id
    name
    fund
    strategy {
      ...StrategyFragment
    }
  }
  update {
    ...on ComponentGameInfoUpdate {
      cycle
      message
    }
    ...on ComponentGameRegionUpdate {
      cycle 
      region {
        id
        index
      }
      RegionUserUpdate {
        company {
          ...CompanyFragmentTiny
        }
        count
      }
    }
    ...on ComponentGameCompanyUpdate {
      cycle
      CompanyUserUpdate {
        company {
          ...CompanyFragmentTiny
        }
        revenue
        bankrupt
      }
    }
    ...on ComponentGameFundingUpdate {
      cycle
      FundingUserUpdate {
        company {
          ...CompanyFragmentTiny
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
      company {
        ...CompanyFragmentTiny
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
${StrategyFragment}
${RegionFragment}
${FundingFragment}
${CompanyFragmentTiny}
`;



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
    ...CompanyFragment
  }
}
${StrategyFragment}
${CompanyFragment}
`;

export const CREATE_SIMPLE_GAME_MUTATION = gql`
mutation createSimpleGame {
  createSimpleGame {
    ...GameFragment
  }
}
${GameFragment}`

export const JOIN_GAME_SUBSCRIPTION = gql`
subscription joinGame($company: ID $game: ID!) {
  joinGame(company: $company game: $game) {
    ...on ComponentGameInfoUpdate {
      message
      cycle
    }
    ...on ComponentGameFundingUpdate {
      cycle
      FundingUserUpdate {
        company {
          ...CompanyFragment
        }
        funding {
          name
          amount
        }
      }
    }
    ...on ComponentGameRegionUpdate {
      cycle
      region {
        id
        index
      }
      RegionUserUpdate {
        company {
          ...CompanyFragment
        }
        count
      }
    }
    ...on ComponentGameCompanyUpdate {
      cycle
      CompanyUserUpdate {
        revenue
        company {
          ...CompanyFragment
        }
        bankrupt
      }
    }
  }
}

${CompanyFragment}
`;


export const GAME_QUERY = gql`
query game($gameId: ID!) {
  game(id: $gameId) {
    ...GameFragment
  }
}
${GameFragment}`


export const HISTORY_QUERY = gql`
query gameHistory {
  gameHistory {
    ...GameFragment
  }
}
${GameFragment}`


export const COMPANY_QUERY = gql`
query company($companyId: ID!) {
  company(id: $companyId) {
    ...CompanyFragment
  }
}
${CompanyFragment}
`;
