import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

export const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export const menuTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFF',
    },
  },
});
