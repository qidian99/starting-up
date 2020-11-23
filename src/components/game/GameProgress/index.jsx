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
  Tooltip,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import _ from "lodash";

import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../../../gql";
import { AUTH_ACTIONS, AUTH_FORM_MODE } from "../../../util";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { menuTheme } from "../../../theme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { GAME_ACTIONS } from "../../../util/game";
import { ReactComponent as CycleIcon } from "../../../assets/clock.svg";
import { ReactComponent as ScheduleIcon } from "../../../assets/schedule.svg";
import { ReactComponent as FundingIcon } from "../../../assets/loan.svg";

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { simpleGameFundings } from "starting-up-common";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 360,
    backgroundColor: "#F4FBFF",
    [theme.breakpoints.down("md")]: {},
  },
  title: {
    backgroundColor: "#FFF",
  },
  titleButton: {
    padding: theme.spacing(1),
  },
  icon: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  infoIcon: {
    marginLeft: theme.spacing(1),
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  text: {
    fontWeight: 800,
    fontSize: 32,
  },
  entry: {
    margin: theme.spacing(2),
  },
}));

const GameProgressEntry = ({ Icon, text, tooltip }) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.entry}
      container
      justify="flex-start"
      alignItems="center"
    >
      <Grid xs={5} item container justify="flex-start" alignItems="center">
        <Icon className={classes.icon} />
        <Tooltip title={tooltip} aria-label="info">
          <InfoOutlinedIcon className={classes.infoIcon} />
        </Tooltip>
      </Grid>
      <Grid xs={7} item>
        <Typography className={classes.text} variant="h6">
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

const GameProgress = ({ cycle, fundings }) => {
  const classes = useStyles();
  const sortedFundings = _.sortBy(fundings, ({ cycle }) => cycle);
  const funding = _.find(sortedFundings, ({ cycle: fundingCycle }) => fundingCycle > cycle);
  let schedule = "N/A";
  let amount = "N/A";
  if (funding) {
    schedule = funding.cycle - cycle;
    amount = funding.amount;
  }

  return (
    <Box className={classes.root}>
      <Box
        className={classes.title}
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.titleButton}
        >
          <Typography>Timeline</Typography>
        </Button>
      </Box>
      <Box padding={2}>
        <Grid container>
          <GameProgressEntry
            Icon={CycleIcon}
            text={cycle}
            tooltip={"Current cycle"}
          />
          <GameProgressEntry
            Icon={ScheduleIcon}
            text={schedule}
            tooltip={"How many cycles until next funding phase"}
          />
          <GameProgressEntry
            Icon={FundingIcon}
            text={amount}
            tooltip={"Funding amount in next funding phase"}
          />
        </Grid>
      </Box>
    </Box>
  );
};

GameProgress.defaultProps = {
  cycle: 0,
  fundings: simpleGameFundings,
};

export default GameProgress;
