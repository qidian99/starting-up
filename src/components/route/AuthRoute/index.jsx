import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.jwt) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};


const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(AuthRoute);
