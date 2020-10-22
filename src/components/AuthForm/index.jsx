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
import { AUTH_FORM_MODE } from "../../util";

const userStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 800,
    fontSize: 48,
    padding: theme.spacing(3),
  },
  formInput: {
    minWidth: 360,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  action: {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

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
      return "Not have an account?";
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

const AuthForm = () => {
  const classes = userStyles();
  const { addToast } = useToasts();
  const [mode, setMode] = useState(AUTH_FORM_MODE.LOGIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data: loginResponse }] = useMutation(LOGIN_MUTATION);
  const [signup, { data: signupResponse }] = useMutation(SIGNUP_MUTATION);
  const [error, setError] = useState(null);
  const onButtonClick = useCallback(() => {
    if (mode === AUTH_FORM_MODE.LOGIN) {
      login({ variables: { username: email, password } }).catch((e) =>
        setError("Login failed")
      );
    } else {
      signup({ variables: { username: email, email, password } }).catch((e) =>
        setError("Sign up failed")
      );
    }
  }, [login, signup, mode, email, password]);
  const onActionClick = useCallback(() => {
    if (mode === AUTH_FORM_MODE.LOGIN) {
      setMode(AUTH_FORM_MODE.SIGNUP);
    } else {
      setMode(AUTH_FORM_MODE.LOGIN);
    }
  }, [mode]);

  useEffect(() => {
    console.log("Auth form responses", { loginResponse, signupResponse });
    return () => {};
  }, [loginResponse, signupResponse]);

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", onDismiss: setError(null) });
    }
    return () => {};
  }, [addToast, error]);

  return (
    <Box
      padding={2}
      justifyContent="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography className={classes.title} variant="h1">
        Starting Up
      </Typography>

      <FormControl>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.formInput}
          label="Email"
          variant="outlined"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.formInput}
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <Button
          onClick={onButtonClick}
          color="primary"
          variant="contained"
          className={classes.button}
        >
          {getLoginButtonText(mode)}
        </Button>
      </FormControl>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignSelf="flex-end"
        marginTop={1}
      >
        <Typography>{getLoginPrompt(mode)}</Typography>
        <Box onClick={onActionClick}>
          <Typography className={classes.action} color="primary">
            {getLoginAction(mode)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthForm;
