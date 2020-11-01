mutation createCompany($name: String! $preseed: Float! $seed: Float! $seriesA: Float! $seriesB: Float! $seriesC: Float!) {
  createCompany(input: {
    data: {
      name: $name
      strategy: {
        preseed:$preseed
        seed:$seed
        seriesA:$seriesA
        seriesB:$seriesB
        seriesC:$seriesC
      }
    }
  }) {
    company {
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
}

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

query companies {
  companies {
    id
    name
    fund
    user {
      id
      email
    }
    strategy {
      ...StrategyFragment
    }
    createdAt
    games {
      id
    }
  }
}

mutation createSimpleGame {
  createSimpleGame {
    ...GameFragment
  }
}

query games {
  games(sort: "createdAt:ASC") {
    id
  }
}

query company($companyId: ID!) {
  company(id: $companyId) {
    ...CompanyFragment
  }
}

query game($gameId: ID!) {
  game(id: $gameId) {
    ...GameFragment
  }
}

fragment RegionFragment on Region {
  id
  population
  conversionRate
  leavingRate
  revenue
  cost
  growth
}

fragment FundingFragment on Funding {
	id
  amount
  cycle
  threshold
}

# fragment UserFragment on UsersPermissionsUser {
#   id
#   username
# }

fragment StrategyFragment on ComponentCompanyStrategy {
  id
  preseed
  seed
  seriesA
  seriesB
  seriesC
}

fragment GameFragment on Game {
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
          company {
          ...CompanyFragmentTiny
        }
        count
      }
    }
    ...on ComponentGameCompanyUpdate {
      CompanyUserUpdate {
        company {
          ...CompanyFragmentTiny
        }
        revenue
        bankrupt
      }
    }
    ...on ComponentGameFundingUpdate {
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

fragment CompanyFragmentTiny on Company {
  id
  name
}

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

