import React from "react";
const { Button, makeStyles, Grid } = require("@material-ui/core");

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    // margin: theme.spacing(6),
    background: "#FAFAFA",
    width: "100%",
    fontSize: 32,
    fontWeight: 500,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
  },
}));

const MenuItem = ({ title, onMenuClick }) => {
  const classes = useStyles();
  return (
    <Button
      color="secondary"
      variant="outlined"
      className={classes.root}
      onClick={onMenuClick}
    >
      {title}
    </Button>
  );
};

export default MenuItem;
