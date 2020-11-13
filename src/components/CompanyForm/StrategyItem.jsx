

import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

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
  Tooltip,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../../gql";
import { AUTH_ACTIONS, AUTH_FORM_MODE } from "../../util";
import { useSelector, useDispatch } from "react-redux";
import { STRATEGY_ERROR_TEXT } from "../../util/game";



const userStyles = makeStyles((theme) => ({
  smallInput: {
    width: "100%",
  },
  strategyGrid: {
    position: "relative",
  },
  infoIcon: {
    position: "absolute",
    top: 28,
    right: 40,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const StrategyItem = ({
  onChange,
  value,
  label,
  tooltip,
  ...rest
}) => {
  const classes = userStyles();
  return (
    <Grid item xs={4} className={classes.strategyGrid}>
      <TextField
        type="number"
        value={value}
        onChange={onChange}
        className={classes.smallInput}
        label={label}
        variant="outlined"
        {...rest}
      />
      <Tooltip
        title={tooltip}
        aria-label="info"
      >
        <InfoOutlinedIcon className={classes.infoIcon} />
      </Tooltip>
    </Grid>
  );
}

export default StrategyItem;
