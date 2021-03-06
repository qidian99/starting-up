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
import History from "./views/History";
import HistoryList from "./views/HistoryList";
import CompanyList from "./views/CompanyList";
import Introduction from "./views/Project/Introduction";
import Model from "./views/Project/Model";
import Evaluation from "./views/Project/Evaluation";
import Demo from "./views/Project/Demo";
import Conclusion from "./views/Project/Conclusion";
import Contact from "./views/Forms/Contact";
import Report from "./views/Forms/Report";

function App(props) {
  const user = store.getState().auth.user;
  // console.log('In App', { user })
  return (
    <Switch>
      <AuthRoute exact path="/" component={Auth} />
      <ProtectedRoute
        exact
        path="/dashboard"
        user={user}
        component={Dashboard}
      />
      <ProtectedRoute exact path="/company" component={Company} />
      <ProtectedRoute exact path="/companies" component={CompanyList} />
      <ProtectedRoute path="/history/:gameId" component={History} />
      <ProtectedRoute exact path="/history" component={HistoryList} />
      <ProtectedRoute exact path="/simplegame" component={SimpleGame} />
      <Route exact path="/unauthorized" component={Unauthorized} />
      {/* Project specific */}
      <Route exact path="/project/introduction" component={Introduction} />
      <Route exact path="/project/model" component={Model} />
      <Route exact path="/project/demo" component={Demo} />
      <Route exact path="/project/evaluation" component={Evaluation} />
      <Route exact path="/project/conclusion" component={Conclusion} />
      {/* Contact forms */}
      <Route exact path="/forms/contact" component={Contact} />
      <Route exact path="/forms/report" component={Report} />
    </Switch>
  );
}

export default withRouter(App);
