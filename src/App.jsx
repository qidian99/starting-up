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

import Unauthorized from "./views/Unauthorized";

import "antd/dist/antd.css";
import "./App.less";

// Views
import Dashboard from "./views/Dashboard";
import Auth from "./views/Auth";

import ProtectedRoute from "./components/route/ProtectedRoute";
import AuthRoute from "./components/route/AuthRoute";
import { store } from "./reducers";
import Company from "./views/Company";
import SimpleGame from "./views/SimpleGame";

function App(props) {
  const user = store.getState().auth.user;
  console.log('In App', { user })
  return (
    <Switch>
      <AuthRoute exact path="/" user={user} component={Auth} />
      <ProtectedRoute
        exact
        path="/dashboard"
        user={user}
        component={Dashboard}
      />
      <ProtectedRoute exact path="/company" user={user} component={Company} />
      <ProtectedRoute exact path="/simplegame" user={user} component={SimpleGame} />
      <Route exact path="/unauthorized" component={Unauthorized} />
    </Switch>
  );
}

export default withRouter(App);
