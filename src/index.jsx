import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import { CookiesProvider, withCookies } from "react-cookie";

import { split, HttpLink, ApolloClient, ApolloProvider  } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "@apollo/client/link/ws";

// Create an http link:
const httpLink = new HttpLink({
  uri: "http://localhost:1337/graphql",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:1337/graphql`,
  options: {
    reconnect: true,
    // connectionParams: {
    //   authToken: user.authToken,
    // },
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
  dataIdFromObject: (object) => object[`${object.__typename.toLowerCase()}Id`],
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: sessionStorage.getItem("Authorization")
      ? `Bearer ${sessionStorage.getItem("Authorization")}`
      : "",
    // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAyOTA4OTk5LCJleHAiOjE2MDU1MDA5OTl9.4rlNUMqceZHsSnkQqSpP2mTX92Kn6Q7PzoCyNHP--xI',
  },
}));

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
