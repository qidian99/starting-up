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
  ButtonBase,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import _ from "lodash";
import { noCompanyResult } from 'starting-up-common'
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../../../gql";
import { AUTH_ACTIONS, AUTH_FORM_MODE } from "../../../util";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { menuTheme } from "../../../theme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { GAME_ACTIONS } from "../../../util/game";
import { ReactComponent as MoneyIcon } from "../../../assets/money-bag.svg";
import { ReactComponent as UserIcon } from "../../../assets/profile.svg";
import { ReactComponent as CompanyIcon } from "../../../assets/buildings.svg";

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 360,
    backgroundColor: "#F4FBFF",
    [theme.breakpoints.down("md")]: {},
  },
  header: {
    backgroundColor: "#FFF",
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
  companyButton: {
    padding: theme.spacing(1),
  },
}));

const GameCompanyStatusEntry = ({ Icon, text, tooltip }) => {
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

const GameStatus = ({ companies: companyInput }) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  // console.log({
  //   companyInput,
  //   noCompanyResult,
  // })

  const companies = [...companyInput];
  if (companies.length === 0) {
    companies.push(noCompanyResult)
  }

  return (
    <Box className={classes.root}>
      <Grid
        className={classes.header}
        container
        justify="flex-start"
        alignItems="center"
      >
        {companies.map(({ name, company }, i) => (
          <Grid item xs key={`StatusHeader-${name}-${i}`}>
            <Button
              onClick={() => setIndex(i)}
              // disabled={i === index}
              {...(i === index ? { variant: "contained" } : {})}
              fullWidth
              color={i === index ? "primary" : "default"}
              className={classes.companyButton}
            >
              <Typography>{name || company.name}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
      {companies.map(
        ({ name, revenue, numUsers, numRegions }, i) =>
          i === index && (
            <GameCompanyStatus
              key={`StatusBody-${name}-${i}`}
              revenue={revenue}
              numUsers={numUsers}
              numRegions={numRegions}
            />
          )
      )}
    </Box>
  );
};

const GameCompanyStatus = ({ revenue, numUsers, numRegions }) => {
  const classes = useStyles();

  return (
    <Box padding={2}>
      <Grid container>
        <GameCompanyStatusEntry
          Icon={MoneyIcon}
          text={revenue}
          tooltip={"Total revenue this user has accumulated"}
        />
        <GameCompanyStatusEntry
          Icon={UserIcon}
          text={numUsers}
          tooltip={"Total number of users across all regions"}
        />
        <GameCompanyStatusEntry
          Icon={CompanyIcon}
          text={numRegions}
          tooltip={"Total number of regions"}
        />
      </Grid>
    </Box>
  );
};

GameCompanyStatus.defaultProps = {
  name: "User 1",
  revenue: 10,
  numUsers: 10,
  numRegions: 1,
};

GameStatus.defaultProps = {
  companies: [
    {
      name: "User 1",
      revenue: 10,
      numUsers: 10,
      numRegions: 1,
    },
    {
      name: "User 2",
      revenue: 30,
      numUsers: 20,
      numRegions: 1,
    },
  ],
};

export default GameStatus;
