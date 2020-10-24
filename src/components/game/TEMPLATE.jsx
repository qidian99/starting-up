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
  Grid,
  ThemeProvider,
  useTheme,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../../gql";
import { AUTH_ACTIONS, AUTH_FORM_MODE } from "../../util";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "../MenuItem";
import { useHistory } from "react-router-dom";
import { menuTheme } from "../../theme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { GAME_ACTIONS } from "../../util/game";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
    },
  },
}));

const GameProgress = () => {
  const classes = useStyles();
 
  return (
  );
};

export default GameProgress;
