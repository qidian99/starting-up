subscription joinGame {
  joinGame(company: "5f94af4d30002bf736b379e4" game: "5f94af4e30002bf736b379f4") {
    ...on ComponentGameInfoUpdate {
      message
      cycle
    }
    ...on ComponentGameFundingUpdate {
      cycle
      FundingUserUpdate {
        company {
          name
        }
        funding {
          name
          amount
        }
      }
    }
    ...on ComponentGameRegionUpdate {
      cycle
      RegionUserUpdate {
        company {
          name
        }
        count
      }
    }
  }
}

subscription custom {
  onCustomSubscription(channel: "5f9459e13fc9d9952b2bcc1f")
}

# 5f9459e13fc9d9952b2bcc1f
# 5f9459e03fc9d9952b2bcc0f
# query test {
  
# }
