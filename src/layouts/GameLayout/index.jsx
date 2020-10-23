import React from "react";
import {
  Box,
  makeStyles,
  Paper,
  Typography,
  createStyles,
  Theme,
  AppBar,
  Toolbar,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from 'clsx';

import { ReactComponent as CompanyIcon } from "../../assets/buildings.svg";
import { ReactComponent as RegionIcon } from "../../assets/tiles.svg";
import { ReactComponent as RevenueIcon } from "../../assets/money-bag.svg";
import { ReactComponent as UserIcon } from "../../assets/profile.svg";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    height: "100vh",
    flexDirection: "column",
  },
  container: {
    position: "relative",
    backgroundColor: "#F2F2F2",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  user: {
    bottom: -theme.spacing(8),
    right: theme.spacing(12),
  },
  children: {
    padding: theme.spacing(2),
  },
  exitButton: {
    minWidth: 120,
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
  },
  actionButton: {
    minWidth: 100,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

const AuthLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, classes.flex)}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            STARTING UP
          </Typography>
          <Button variant="outlined" color="inherit" className={classes.actionButton}>
            Log
          </Button>
          <Button variant="outlined" color="inherit" className={classes.actionButton}>
            Status
          </Button>
          <Button variant="outlined" color="inherit" className={classes.actionButton}>
            Progress
          </Button>
          <Button variant="outlined" color="inherit" className={classes.actionButton}>
            Setting
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            className={classes.exitButton}
          >
            Exit
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        width="100%"
        height="60%"
        className={clsx(classes.container, classes.flex)}
      >
        <Box className={clsx(classes.children, classes.flex)}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
