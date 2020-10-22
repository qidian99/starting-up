import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { useSubscription, useQuery } from "@apollo/client";
import AuthLayout from "../../layouts/AuthLayout";




const CustomSubscription = () => {
  const {
    data,
    loading,
  } = useSubscription(CUSTOM_SUBSCRIPTION, { variables: {} });
  console.log("CustomSubscription", data);
  return <h4>subscription: {!loading && data.onCustomSubscription}</h4>;
};


export default (props) => {

  const { loading, data } = useQuery(USERS_QUERY);
  console.log(data);
  return (
    <AuthLayout>
      <p>This is the Auth</p>
      <CustomSubscription></CustomSubscription>
    </AuthLayout>
  );
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

const CUSTOM_SUBSCRIPTION = gql`
  subscription custom {
    onCustomSubscription(channel: "test")
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
