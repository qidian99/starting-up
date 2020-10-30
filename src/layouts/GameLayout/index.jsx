import React, { useEffect, useCallback, useState } from "react";
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import PropTypes from "prop-types";
import Popover from "@material-ui/core/Popover";
import { AccessTime } from "@material-ui/icons";

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
    border: "1px dashed rgba(0, 0, 0, 0.23)",
    minWidth: 100,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    fontWeight: 800,
  },
}));

const GameLogButton = ({ logs }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = "game-statust-button";

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        color="inherit"
        className={classes.actionButton}
      >
        Log
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Paper style={{ width: 300, maxHeight: 600, overflow: "auto" }}>
          {logs.length === 0 ? (
            <ListItem button>
              <ListItemText primary={"No logs available"} />
            </ListItem>
          ) : (
            <List>
              {logs.map((log, index) => (
                <ListItem button key={"log" + index}>
                  <ListItemIcon>
                    <AccessTime />
                  </ListItemIcon>
                  <ListItemText primary={log} />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Popover>
    </>
  );
};

const GameLayout = ({
  onLogClick,
  logs,
  onStatusClick,
  onProgressClick,
  onSettingClick,
  onExitClick,
  children,
}) => {
  const classes = useStyles();

  useEffect(() => {
    console.log("GameLayout logs", logs);
  }, [logs]);

  return (
    <Box className={clsx(classes.root, classes.flex)}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            STARTING UP
          </Typography>
          <GameLogButton logs={logs} />
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
        <Box width="100%" className={clsx(classes.children, classes.flex)}>
          {children}
        </Box>
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
  logs: PropTypes.array,
};

GameLayout.defaultProps = {
  onLogClick: () => {},
  onStatusClick: () => {},
  onProgressClick: () => {},
  onSettingClick: () => {},
  onExitClick: () => {},
  children: null,
  logs: [],
};

export default GameLayout;
