import React, { useCallback } from "react";
import {
  Box,
  Button,
  makeStyles,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import OutlinedFlagIcon from "@material-ui/icons/OutlinedFlag";
import PolymerIcon from "@material-ui/icons/Polymer";
import BuildIcon from "@material-ui/icons/Build";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import BugReportIcon from "@material-ui/icons/BugReport";
import StopOutlinedIcon from "@material-ui/icons/StopOutlined";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailIcon from "@material-ui/icons/Mail";
import { ReactComponent as CompanyIcon } from "../../assets/buildings.svg";
import { ReactComponent as RegionIcon } from "../../assets/tiles.svg";
import { ReactComponent as RevenueIcon } from "../../assets/money-bag.svg";
import { ReactComponent as UserIcon } from "../../assets/profile.svg";
import { useHistory } from "react-router-dom";

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    height: "100vh",
  },
  container: {
    position: "relative",
    backgroundColor: "#F2F2F2",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  icon: {
    position: "absolute",
    width: theme.spacing(16),
    height: theme.spacing(16),
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  company: {
    top: -theme.spacing(8),
    left: theme.spacing(12),
  },
  region: {
    top: -theme.spacing(8),
    right: theme.spacing(12),
  },
  revenue: {
    bottom: -theme.spacing(8),
    left: theme.spacing(12),
  },
  user: {
    bottom: -theme.spacing(8),
    right: theme.spacing(12),
  },
  children: {
    padding: theme.spacing(2),
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const PersistentDrawer = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onMenuClick = useCallback(
    (text) => () => {
      const route = getRoute(text);
      if (route.startsWith("http")) {
        window.open(route);
      } else {
        history.push(route)
      }
    },
    [history],
  )

  return (
    <Box className={clsx(classes.root, classes.flex)}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Box className={classes.title}>
            <Button onClick={() => history.push("/")}>
              <Typography
                variant="h6"
                style={{ color: "#FFF", fontWeight: "bold" }}
                noWrap
              >
                Starting Up
              </Typography>
            </Button>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        padding={0}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {children}
      </Box>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Typography>UCSD Math 111A Project</Typography>
        </div>
        <Divider />
        <List>
          {["Introduction", "Model", "Demo", "Evaluation", "Conclusion"].map(
            (text, index) => (
              <ListItem button key={text} onClick={onMenuClick(text)}>
                <ListItemIcon>{getDrawerIcon(text)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["Contact Information", "Report a Bug", "Github"].map(
            (text, index) => (
              <ListItem button key={text} onClick={onMenuClick(text)}>
                <ListItemIcon>{getDrawerIcon(text)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
};

const getRoute = (text) => {
switch (text) {
  case "Introduction":
    return '/project/introduction';
  case "Model":
    return '/project/model';
  case "Demo":
    return '/project/demo';
  case "Evaluation":
    return '/project/evaluation';
  case "Conclusion":
    return '/project/conclusion';
  case "Contact Information":
    return '/forms/contact';
  case "Report a Bug":
    return "/forms/report";
  case "Github":
    return "https://github.com/qidian99/starting-up";
  default:
    return '/';
}
}

const getDrawerIcon = (text) => {
  switch (text) {
    case "Introduction":
      return <OutlinedFlagIcon />;
    case "Model":
      return <PolymerIcon />;
    case "Demo":
      return <PresentToAllIcon />;
    case "Evaluation":
      return <BuildIcon />;
    case "Conclusion":
      return <StopOutlinedIcon />;
    case "Contact Information":
      return <MailIcon />;
    case "Report a Bug":
      return <BugReportIcon />;
    case "Github":
      return <GitHubIcon />
    default:
      return <MailIcon />;
  }
};
export default PersistentDrawer;
