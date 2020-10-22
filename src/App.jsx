/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import React from "react";
// eslint-disable-next-line
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useParams,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";

import { ToastProvider, DefaultToast } from "react-toast-notifications";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./reducers";
import "antd/dist/antd.css";
import "./App.less";

// Views
import Dashboard from "./views/Dashboard";
import Auth from "./views/Auth";
import { appTheme } from "./theme";
import { ThemeProvider } from "@material-ui/core";

function App(props) {
  // return (<Auth></Auth>);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={appTheme}>
          <ToastProvider
            autoDismiss={false}
            autoDismissTimeout={10000}
            transitionDuration={200}
            placement="top-center"
          >
            <Switch>
              <Route exact path="/" component={Auth} {...props} />
              <Route exact path="/dashboard" component={Dashboard} {...props} />
            </Switch>
          </ToastProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default withRouter(App);
