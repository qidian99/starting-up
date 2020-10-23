import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

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
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../../gql";
import { AUTH_ACTIONS, AUTH_FORM_MODE } from "../../util";
import { useSelector, useDispatch } from "react-redux";

const userStyles = makeStyles((theme) => ({
  root: {
    width: "80vw",
  },
  title: {
    fontWeight: 600,
    fontSize: 32,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  formInput: {
    minWidth: 360,
    marginBottom: theme.spacing(2),
  },
  smallInput: {
    width: '100%',
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

const CompanyForm = ({
  onButtonClick,
  buttonText,
}) => {
  const classes = userStyles();
  const [name, setName] = useState("");
  const strategies = useRef(Array(5).fill(null));
  const setStrategy = useCallback(
    (index, value) => {
      strategies.current[index] = value;
    },
    [],
  )

  const LeftPanel = (
    <React.Fragment>
      <Typography className={classes.title} variant="h1">
        Company Information
      </Typography>

      <FormControl>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={classes.formInput}
          label="Company name"
          variant="outlined"
        />
        <Button
          onClick={onButtonClick(name)}
          color="primary"
          variant="contained"
          className={classes.button}
        >
          {buttonText}
        </Button>
      </FormControl>
    </React.Fragment>
  );
  const RightPanel = (
    <React.Fragment>
      <Typography className={classes.title} variant="h1">
        Strategies
      </Typography>

      <Grid container spacing={3} direction="row">
        <Grid item xs={4}>
          <TextField
            type="number"
            value={strategies.current[0]}
            onChange={(e) => setStrategy(0, e.target.value)}
            className={classes.smallInput}
            label="Pre-seed"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            value={strategies.current[1]}
            onChange={(e) => setStrategy(1, e.target.value)}
            className={classes.smallInput}
            label="Seed round"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            value={strategies.current[2]}
            onChange={(e) => setStrategy(2, e.target.value)}
            className={classes.smallInput}
            label="Series A"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            value={strategies.current[3]}
            onChange={(e) => setStrategy(3, e.target.value)}
            className={classes.smallInput}
            label="Series B"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            value={strategies.current[4]}
            onChange={(e) => setStrategy(4, e.target.value)}
            className={classes.smallInput}
            label="Series C"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return (
    <Grid container className={classes.root} spacing={8}>
      <Grid container item md={5} direction="column">
        {LeftPanel}
      </Grid>
      <Grid container item md={7} direction="column">
        {RightPanel}
      </Grid>
    </Grid>
  );
};

CompanyForm.propTypes = {
  onButtonClick: PropTypes.func,
  buttonText: PropTypes.string,
};
CompanyForm.defaultProps = {
  onButtonClick: () => {},
  buttonText: 'Start Up',
};

export default CompanyForm;
