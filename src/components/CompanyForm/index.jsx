import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { STRATEGY_ERROR_TEXT } from "../../util/game";

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
    width: "100%",
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

const CompanyForm = ({ onButtonClick, buttonText }) => {
  const classes = userStyles();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null)
  const [errors, setErrors] = useState(Array(5).fill(null));
  const [preseed, setPreseed] = useState("");
  const [seed, setSeed] = useState("");
  const [seriesA, setSeriesA] = useState("");
  const [seriesB, setSeriesB] = useState("");
  const [seriesC, setSeriesC] = useState("");

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
          {
            ...(nameError && {
              error: true,
              helperText: nameError,
            })
          }
        />
        <Button
          onClick={() => {
            const strategies = [preseed, seed, seriesA, seriesB, seriesC];
            let error = false;
            const newError = Array(5).fill(null);

            if (name.length === 0) {
              setNameError('Invalid company name.');
            } else {
              setNameError(null);
            }

            strategies.forEach((strategy, index) => {
              if (strategy === "" || strategy < 0 || strategy > 1) {
                newError[index] = STRATEGY_ERROR_TEXT;
                error = true;
              }
            });

            setErrors(newError);
            if (!error) {
              onButtonClick(
                name,
                strategies.map((s) => parseInt(s, 10))
              );
            }
          }}
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
            value={preseed}
            onChange={(e) => setPreseed(e.target.value)}
            className={classes.smallInput}
            label="Pre-seed"
            variant="outlined"
            {...(errors[0]
              ? {
                  error: true,
                  helperText: errors[0],
                }
              : {})}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className={classes.smallInput}
            label="Seed round"
            variant="outlined"
            {...(errors[1]
              ? {
                  error: true,
                  helperText: errors[1],
                }
              : {})}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            value={seriesA}
            onChange={(e) => setSeriesA(e.target.value)}
            className={classes.smallInput}
            label="Series A"
            variant="outlined"
            {...(errors[2]
              ? {
                  error: true,
                  helperText: errors[2],
                }
              : {})}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            value={seriesB}
            onChange={(e) => setSeriesB(e.target.value)}
            className={classes.smallInput}
            label="Series B"
            variant="outlined"
            {...(errors[3]
              ? {
                  error: true,
                  helperText: errors[3],
                }
              : {})}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            value={seriesC}
            onChange={(e) => setSeriesC(e.target.value)}
            className={classes.smallInput}
            label="Series C"
            variant="outlined"
            {...(errors[4]
              ? {
                  error: true,
                  helperText: errors[4],
                }
              : {})}
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
  buttonText: "Start Up",
};

export default CompanyForm;
