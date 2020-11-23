import React from "react";
import {
  Box,
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
import MailIcon from "@material-ui/icons/Mail";
import {ReactComponent as CompanyIcon} from "../../assets/buildings.svg";
import {ReactComponent as RegionIcon} from "../../assets/tiles.svg";
import {ReactComponent as RevenueIcon} from "../../assets/money-bag.svg";
import {ReactComponent as UserIcon} from "../../assets/profile.svg";

const drawerWidth = 240;

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
}));

const AuthLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, classes.flex)}>
      <Box
        width="100%"
        height="60%"
        className={clsx(classes.container, classes.flex)}
      >
        <CompanyIcon className={clsx(classes.company, classes.icon)} />
        <RegionIcon className={clsx(classes.region, classes.icon)} />
        <RevenueIcon className={clsx(classes.revenue, classes.icon)} />
        <UserIcon className={clsx(classes.user, classes.icon)} />
        <Box className={clsx(classes.children, classes.flex)}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
