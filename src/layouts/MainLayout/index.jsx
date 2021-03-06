import React from "react";
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
import MailIcon from "@material-ui/icons/Mail";
import { ReactComponent as CompanyIcon } from "../../assets/buildings.svg";
import { ReactComponent as RegionIcon } from "../../assets/tiles.svg";
import { ReactComponent as RevenueIcon } from "../../assets/money-bag.svg";
import { ReactComponent as UserIcon } from "../../assets/profile.svg";
import { useHistory } from "react-router-dom";
import PersistentDrawer from "../../components/DrawerMenu/PersistentDrawer";

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
    padding: theme.spacing(3),
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

const MainLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <PersistentDrawer>
      <Box
        width="100%"
        height="60vh"
        className={clsx(classes.container, classes.flex)}
      >
        <CompanyIcon className={clsx(classes.company, classes.icon)} />
        <RegionIcon className={clsx(classes.region, classes.icon)} />
        <RevenueIcon className={clsx(classes.revenue, classes.icon)} />
        <UserIcon className={clsx(classes.user, classes.icon)} />
        <Box className={clsx(classes.children, classes.flex)}>{children}</Box>
      </Box>
    </PersistentDrawer>
  );
};


const getDrawerIcon = (text) => {
  switch (text) {
    case "Introduction":
      return <OutlinedFlagIcon />
    case "Model":
      return <PolymerIcon />
    case "Demo":
      return <PresentToAllIcon />
    case "Evaluation":
      return <BuildIcon />;
    case "Conclusion":
      return <StopOutlinedIcon />;
    case "Contact Information":
      return <MailIcon />
    case "Report a Bug":
      return <BugReportIcon />
    default:
      return <MailIcon />
  }

}
export default MainLayout;
