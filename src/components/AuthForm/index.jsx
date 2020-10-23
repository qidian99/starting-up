import React, { Fragment, useCallback, useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import PropTypes from "prop-types";

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

const AuthForm = ({
  onButtonClick,
  onActionClick,
  buttonText,
  loginPrompt,
  loginActionText,
}) => {
  const classes = userStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          onClick={onButtonClick(email, password)}
          color="primary"
          variant="contained"
          className={classes.button}
        >
          {buttonText}
        </Button>
      </FormControl>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignSelf="flex-end"
        marginTop={1}
      >
        <Typography>{loginPrompt}</Typography>
        <Box onClick={onActionClick}>
          <Typography className={classes.action} color="primary">
            {loginActionText}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

AuthForm.propTypes = {
  onButtonClick: PropTypes.func,
  onActionClick: PropTypes.func,
  buttonText: PropTypes.string,
  loginPrompt: PropTypes.string,
  loginActionText: PropTypes.string,
};
AuthForm.defaultProps = {
  onButtonClick: () => {},
  onActionClick: () => {},
  buttonText: "Login",
  loginPrompt: "Not a user?",
  loginActionText: "Register",
};
export default AuthForm;
