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

fragment UserFragment on UsersPermissionsUser {
  id
  username
}

fragment StrategyFragment on ComponentCompanyStrategy {
  id
  preseed
  seed
  seriesA
  seriesB
  seriesC
}
