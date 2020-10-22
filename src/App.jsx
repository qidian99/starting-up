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
} from "react-router-dom";
import { ToastProvider, DefaultToast } from "react-toast-notifications";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CookiesProvider, withCookies } from "react-cookie";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";

import { store, persistor } from "./reducers";
import "antd/dist/antd.css";
import "./App.less";

// Views
import Dashboard from "./Views/Dashboard";
import Auth from "./Views/Auth";


// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:1337/graphql',
});

const cache = new InMemoryCache({
  dataIdFromObject: (object) => object[`${object.__typename.toLowerCase()}Id`],
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: sessionStorage.getItem('Authorization') ? `Bearer ${sessionStorage.getItem('Authorization')}` : '',
    // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAyOTA4OTk5LCJleHAiOjE2MDU1MDA5OTl9.4rlNUMqceZHsSnkQqSpP2mTX92Kn6Q7PzoCyNHP--xI',
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <ToastProvider
            autoDismiss={false}
            autoDismissTimeout={10000}
            transitionDuration={200}
            placement="top-center"
          >
            <Router>
              <Route
                path="/dashboard"
                // exact
                render={Dashboard}
              />
              <Route
                path="/"
                // exact
                render={Auth}
              />
            </Router>
          </ToastProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
