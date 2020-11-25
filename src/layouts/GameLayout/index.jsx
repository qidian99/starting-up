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
  Tooltip,
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import clsx from "clsx";
import PropTypes from "prop-types";
import Popover from "@material-ui/core/Popover";
import { AccessTime } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { STRATEGY_TIPS } from "starting-up-common";
// console.log(STRATEGY_TIPS);
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
    // backgroundColor: theme.palette.primary.main,
    minWidth: 120,
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
  },
  actionButton: {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    // border: "1px dashed rgba(0, 0, 0, 0.23)",
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
  const id = "game-log-button";

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

const GameStatusButton = ({ status }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = "game-status-button";

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        color="inherit"
        className={classes.actionButton}
      >
        Status
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
          {status.length === 0 ? (
            <ListItem button>
              <ListItemText primary={"No status available"} />
            </ListItem>
          ) : (
            <List>
              {status.map(
                ({ company, revenue, numUsers, numRegions }, index) => (
                  <React.Fragment key={"status-" + index}>
                    <ListItem button>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={company.name} />
                    </ListItem>
                    <ListItem button>
                      <ListItemText
                        primary="Total Revenue"
                        secondary={revenue}
                      />
                    </ListItem>
                    <ListItem button>
                      <ListItemText
                        primary="Number of Users"
                        secondary={numUsers}
                      />
                    </ListItem>
                    <ListItem button>
                      <ListItemText
                        primary="Number of Regions"
                        secondary={numRegions}
                      />
                    </ListItem>
                  </React.Fragment>
                )
              )}
            </List>
          )}
        </Paper>
      </Popover>
    </>
  );
};

GameStatusButton.defaultProps = {
  status: [],
};

const GameProgressButton = ({ progress }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = "game-status-button";

  const { cycle, numCycles, fundings = [] } = progress;

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        color="inherit"
        className={classes.actionButton}
      >
        Progress
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
          <List>
            <ListItem button>
              <ListItemText primary={"Current Cycle"} secondary={cycle} />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary={"Total Number of Cycles"}
                secondary={numCycles}
              />
            </ListItem>
            {fundings.map(({ name, amount, cycle }, index) => (
              <ListItem button key={"game-progress-funding" + index}>
                <ListItemText
                  primary={name || `Funding ${index}`}
                  secondary={`Cycle: ${cycle}, Amount: ${amount}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popover>
    </>
  );
};

GameProgressButton.defaultProps = {
  progress: {
    cycle: -1,
    numCycles: -1,
    fundings: [],
  },
};

const GameStrategyButton = ({ setting }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = "game-status-button";

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        color="inherit"
        className={classes.actionButton}
      >
        Strategy
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
          {setting.length === 0 ? (
            <ListItem button>
              <ListItemText primary={"No setting available"} />
            </ListItem>
          ) : (
            <List>
              {setting.map((setting, index) => (
                <ListItem
                  button
                  key={"setting" + index}
                  onClick={() => window.open(STRATEGY_TIPS[index].link)}
                >
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={setting.name}
                    secondary={setting.value}
                  />
                  <Tooltip title={STRATEGY_TIPS[index].text} aria-label="info">
                    <InfoOutlinedIcon />
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Popover>
    </>
  );
};

GameStrategyButton.defaultProps = {
  setting: [],
};


const GameLayout = ({
  onLogClick,
  logs,
  status,
  progress,
  setting,
  onStatusClick,
  onProgressClick,
  onSettingClick,
  onExitClick,
  children,
}) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    // console.log("GameLayout logs", logs);
  }, [logs]);

  return (
    <Box className={clsx(classes.root, classes.flex)}>
      <AppBar position="fixed" color="default" elevation={2}>
        <Toolbar>
          <Box className={classes.title}>
            <Button onClick={() => history.push("/")}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>STARTING UP</Typography>
            </Button>
          </Box>
          <GameLogButton logs={logs} />
          <GameStatusButton status={status} />
          <GameProgressButton progress={progress} />
          <GameStrategyButton setting={setting} />
          <Button
            onClick={onExitClick}
            variant="contained"
            // color="inherit"
            color="primary"
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
