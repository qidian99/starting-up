import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { store, persistor } from "../../reducers";



const Auth = (props) => {
  console.log(props.users);
  return (<div>This is the Auth</div>)
};


const SIGN_IN_MUTATION = gql`
  mutation login {
    login(input: { identifier: "test@ucsd.edu", password: "test" }) {
      user {
        username
        email
        confirmed
      }
      jwt
    }
  }
`;

const USERS_QUERY = gql`
query users {
  users {
    id
    provider
    username
    email
    confirmed
  }
}
`;


function mapStateToProps(state, ownProps) {
  const { game } = state;
  return {};
}

export default compose(
  withRouter,
  connect(mapStateToProps, (dispatch) => ({
    loginUser: (user) =>
      dispatch({
        type: "LOGIN_USER",
        user,
      }),
  })),
  graphql(USERS_QUERY, {
    props: ({ data: { users, loading } }) => ({
      loading,
      users,
    }),
  }),
  graphql(SIGN_IN_MUTATION, {
    props: ({ mutate }) => ({
      login: (variables) => mutate({ variables }),
    }),
  })
)(Auth);
