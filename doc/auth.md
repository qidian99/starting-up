mutation login {
  login(input:{
  	identifier: "bota"
    password: "123456"
  }) {
    jwt
    user {
      id
      email
      username
    }
  }
}
