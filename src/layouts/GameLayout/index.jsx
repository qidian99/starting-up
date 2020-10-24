import React, { useEffect } from "react";
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
import clsx from "clsx";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    height: "100vh",
    flexDirection: "column",
    width: "100vw",
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
    border: '1px dashed rgba(0, 0, 0, 0.23)',
    minWidth: 100,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    fontWeight: 800,
  },
}));

const GameLayout = ({
  onLogClick,
  onStatusClick,
  onProgressClick,
  onSettingClick,
  onExitClick,
  children,
}) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, classes.flex)}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            STARTING UP
          </Typography>
          <Button
            onClick={onLogClick}
            variant="outlined"
            color="inherit"
            className={classes.actionButton}
          >
            Log
          </Button>
          <Button
            onClick={onStatusClick}
            variant="outlined"
            color="inherit"
            className={classes.actionButton}
          >
            Status
          </Button>
          <Button
            onClick={onProgressClick}
            variant="outlined"
            color="inherit"
            className={classes.actionButton}
          >
            Progress
          </Button>
          <Button
            onClick={onSettingClick}
            variant="outlined"
            color="inherit"
            className={classes.actionButton}
          >
            Setting
          </Button>
          <Button
            onClick={onExitClick}
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
        <Box width="100%" className={clsx(classes.children, classes.flex)}>{children}</Box>
      </Box>
    </Box>
  );
};

GameLayout.prototype = {
  onLogClick: PropTypes.func,
  onStatusClick: PropTypes.func,
  onProgressClick: PropTypes.func,
  onSettingClick: PropTypes.func,
  onExitClick: PropTypes.func,
  children: PropTypes.elementType,
};

GameLayout.defaultProps = {
  onLogClick: () => {},
  onStatusClick: () => {},
  onProgressClick: () => {},
  onSettingClick: () => {},
  onExitClick: () => {},
  children: null,
};

export default GameLayout;
