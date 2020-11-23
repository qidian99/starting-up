import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { onError } from "@apollo/client/link/error";
import { store, persistor } from "./reducers";
import { appTheme } from "./theme";
import { ThemeProvider } from "@material-ui/core";
import {
  split,
  HttpLink,
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

import { setContext } from "apollo-link-context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { ToastProvider, DefaultToast } from "react-toast-notifications";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// For generating possible types
// import './gql/possibleTypes';
import possibleTypes from "./gql/possibleTypes.json";
import { AUTH_ACTIONS } from "./util";

// Create an http link:
const httpLink = new HttpLink({
  uri: "http://localhost:1337/graphql",
  // uri: "https://startup-qidian99.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const jwt = store.getState().auth.jwt;
  return {
    headers: {
      ...headers,
      Authorization: jwt ? `Bearer ${jwt}` : "",
    },
  };
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:1337/graphql`,
  options: {
    reconnect: true,
    connectionParams: () => ({
      authToken: store.getState().auth.jwt,
    }),
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache({
  // dataIdFromObject: (object) => object[`${object.__typename.toLowerCase()}Id`],
  possibleTypes,
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          if (message === "Forbidden") {
            store.dispatch({ type: AUTH_ACTIONS.LOGOUT });
          }
          return console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authLink.concat(splitLink),
  ]),
  cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={appTheme}>
            <ToastProvider
              autoDismiss={true}
              autoDismissTimeout={2000}
              transitionDuration={200}
              placement="top-center"
            >
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ToastProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
