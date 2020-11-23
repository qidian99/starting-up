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

import StartMenuButton from "../MenuItem/StartMenuButton";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "fit-content",
    [theme.breakpoints.down("md")]: {
      // margin: theme.spacing(2),
      // "& > .MuiGrid-item": {
      //   padding: theme.spacing(2),
      // },
      // backgroundColor: theme.palette.primary.main,
    },
  },
}));

const DashboardMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={menuTheme}>
      <Box width="50%">
        <Grid container className={classes.root} spacing={isSmall ? 2 : 10}>
          <Grid item sm={12} md={6}>
            <StartMenuButton
              onMenuClick={async (index) => {
                dispatch({
                  type: GAME_ACTIONS.REGISTER_GAME,
                });
                switch (index) {
                  case 0: {
                    history.push("/company");
                    break;
                  }
                  case 1: {
                    await dispatch({
                      type: GAME_ACTIONS.SET_NEW_GAME,
                      value: false, // TODO: only in dev mode
                    });
                    history.push("/simplegame");
                    break;
                  }
                  default: {
                    await dispatch({
                      type: GAME_ACTIONS.SET_NEW_GAME,
                      value: true,
                    });
                    history.push("/simplegame");
                  }
                }
              }}
            ></StartMenuButton>
            {/* <MenuItem
              title="Start"
              onMenuClick={() => {
                dispatch({
                  type: GAME_ACTIONS.REGISTER_GAME,
                });
                history.push("/company");
              }}
            /> */}
          </Grid>
          <Grid item sm={12} md={6}>
            <MenuItem
              title="History"
              onMenuClick={() => {
                history.push("/history");
              }}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <MenuItem
              title="Companies"
              onMenuClick={() => {
                history.push("/companies");
              }}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <MenuItem
              title="Quit"
              onMenuClick={() => {
                dispatch({
                  type: AUTH_ACTIONS.LOGOUT,
                });
                history.push("/");
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardMenu;
