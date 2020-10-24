import { compose } from "redux";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { useSubscription, useQuery } from "@apollo/client";
import AuthLayout from "../../layouts/AuthLayout";
import AuthForm from "../../components/AuthForm";
import { useHistory } from "react-router-dom";

import React, { Fragment, useCallback, useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import {
  Input,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Box,
  TextField,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../../gql";
import { AUTH_ACTIONS, AUTH_FORM_MODE } from "../../util";
import { useSelector, useDispatch } from "react-redux";

// const CustomSubscription = () => {
//   const {
//     data,
//     loading,
//   } = useSubscription(CUSTOM_SUBSCRIPTION, { variables: {} });
//   console.log("CustomSubscription", data);
//   return <h4>subscription: {!loading && data.onCustomSubscription}</h4>;
// };

const getLoginButtonText = (mode) => {
  switch (mode) {
    case AUTH_FORM_MODE.SIGNUP:
      return "SIGNUP";
    case AUTH_FORM_MODE.LOGIN:
    default:
      return "Login";
  }
};

const getLoginPrompt = (mode) => {
  switch (mode) {
    case AUTH_FORM_MODE.SIGNUP:
      return "Already have an account?";
    case AUTH_FORM_MODE.LOGIN:
    default:
      return "Don't have an account?";
  }
};

const getLoginAction = (mode) => {
  switch (mode) {
    case AUTH_FORM_MODE.SIGNUP:
      return "Login Now";
    case AUTH_FORM_MODE.LOGIN:
    default:
      return "Register Now";
  }
};

export default (props) => {
  const [login, { data: loginResponse }] = useMutation(LOGIN_MUTATION);
  const [signup, { data: signupResponse }] = useMutation(SIGNUP_MUTATION);
  const [error, setError] = useState(null);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const [mode, setMode] = useState(AUTH_FORM_MODE.LOGIN);

  const onActionClick = useCallback(() => {
    if (mode === AUTH_FORM_MODE.LOGIN) {
      setMode(AUTH_FORM_MODE.SIGNUP);
    } else {
      setMode(AUTH_FORM_MODE.LOGIN);
    }
  }, [mode]);

  useEffect(() => {
    console.log(auth);
    return () => {};
  }, [auth]);

  const onButtonClick = useCallback(
    (email, password) => () => {
      if (mode === AUTH_FORM_MODE.LOGIN) {
        login({ variables: { username: email, password } }).catch((e) => {
          console.log(e);
          setError("Login failed");
        });
      } else {
        signup({ variables: { username: email, email, password } }).catch(
          (e) => {
            console.log(e);
            setError("Sign up failed");
          }
        );
      }
    },
    [login, signup, mode]
  );

  useEffect(() => {
    console.log("Auth form responses", { loginResponse, signupResponse });
    const response = loginResponse || loginResponse;
    if (!response) return;
    if (loginResponse) {
      const {
        login: { user, jwt },
      } = loginResponse;
      dispatch({ type: AUTH_ACTIONS.LOGIN, user, jwt });
      history.push("/dashboard");
    }

    return () => {};
  }, [loginResponse, signupResponse, dispatch, history]);

  const { addToast } = useToasts();

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", onDismiss: setError(null) });
    }
    return () => {};
  }, [addToast, error]);

  return (
    <AuthLayout>
      <AuthForm
        mode={mode}
        onButtonClick={onButtonClick}
        onActionClick={onActionClick}
        buttonText={getLoginButtonText(mode)}
        loginPrompt={getLoginPrompt(mode)}
        loginActionText={getLoginAction(mode)}
      />
    </AuthLayout>
  );
};

// const CUSTOM_SUBSCRIPTION = gql`
//   subscription custom {
//     onCustomSubscription(channel: "test")
//   }
// `;
