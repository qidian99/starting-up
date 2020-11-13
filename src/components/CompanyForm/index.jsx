import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

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
import StrategyItem from "./StrategyItem";

const userStyles = makeStyles((theme) => ({
  root: {
    width: "80vw",
    [theme.breakpoints.down("md")]: {
      "& > .b-panel": {
        padding: 0,
      },
    },
  },
  title: {
    fontWeight: 600,
    fontSize: 32,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  formInput: {
    minWidth: 360,
    marginBottom: theme.spacing(0),
  },
  smallInput: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },
  action: {
    textDecoration: "underline",
    cursor: "pointer",
  },
  strategyGrid: {
    position: "relative",
  },
  infoIcon: {
    position: "absolute",
    top: 28,
    right: 40,
  },
}));

const CompanyForm = ({ onButtonClick, buttonText, width }) => {
  const classes = userStyles();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [errors, setErrors] = useState(Array(5).fill(null));
  const [preseed, setPreseed] = useState("");
  const [seed, setSeed] = useState("");
  const [seriesA, setSeriesA] = useState("");
  const [seriesB, setSeriesB] = useState("");
  const [seriesC, setSeriesC] = useState("");

  let md = true;
  if (isWidthDown("md", width)) {
    md = false;
  }

  const SubmitButton = (
    <Button
      onClick={() => {
        const strategyRaw = { preseed, seed, seriesA, seriesB, seriesC };
        const strategy = {};
        let error = false;
        const newError = Array(5).fill(null);

        if (name.length === 0) {
          setNameError("Invalid company name.");
        } else {
          setNameError(null);
        }

        Object.keys(strategyRaw).forEach((key, index) => {
          const val = strategyRaw[key];
          if (val === "" || val < 0 || val > 1) {
            newError[index] = STRATEGY_ERROR_TEXT;
            error = true;
          } else {
            strategy[key] = parseFloat(val);
          }
        });

        setErrors(newError);
        if (!error) {
          onButtonClick(name, strategy);
        }
      }}
      color="primary"
      variant="contained"
      className={classes.button}
    >
      {buttonText}
    </Button>
  );

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
          {...(nameError && {
            error: true,
            helperText: nameError,
          })}
        />
        {md && SubmitButton}
      </FormControl>
    </React.Fragment>
  );
  const RightPanel = (
    <React.Fragment>
      <Typography className={classes.title} variant="h1">
        Strategies
      </Typography>

      <Grid container spacing={3} direction="row">
        <StrategyItem
          value={preseed}
          onChange={(e) => setPreseed(e.target.value)}
          label="Pre-seed"
          tooltip="Market occupancy threshold in pre-seed period after which the company should expand."
          {...(errors[0]
            ? {
                error: true,
                helperText: errors[0],
              }
            : {})}
        />
        <StrategyItem
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          label="Seed round"
          tooltip="Market occupancy threshold after seed round after which the company should expand."
          {...(errors[1]
            ? {
                error: true,
                helperText: errors[1],
              }
            : {})}
        />
        <StrategyItem
          value={seriesA}
          onChange={(e) => setSeriesA(e.target.value)}
          label="Series A"
          tooltip="Market occupancy threshold after series A after which the company should expand."
          {...(errors[2]
            ? {
                error: true,
                helperText: errors[2],
              }
            : {})}
        />
        <StrategyItem
          value={seriesB}
          onChange={(e) => setSeriesB(e.target.value)}
          label="Series B"
          tooltip="Market occupancy threshold after series B after which the company should expand."
          {...(errors[3]
            ? {
                error: true,
                helperText: errors[3],
              }
            : {})}
        />
        <StrategyItem
          value={seriesC}
          onChange={(e) => setSeriesC(e.target.value)}
          label="Series C"
          tooltip="Market occupancy threshold after series C after which the company should expand."
          {...(errors[4]
            ? {
                error: true,
                helperText: errors[4],
              }
            : {})}
        />
      </Grid>
      {!md && SubmitButton}
    </React.Fragment>
  );

  return (
    <Grid container className={classes.root} spacing={8}>
      <Grid
        className="b-panel"
        container
        item
        md={12}
        lg={5}
        direction="column"
      >
        {LeftPanel}
      </Grid>
      <Grid
        className="b-panel"
        container
        item
        md={12}
        lg={7}
        direction="column"
      >
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

export default withWidth()(CompanyForm);
