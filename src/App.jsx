/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import React from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Redirect, Switch, useParams } from 'react-router-dom';
import { ToastProvider, DefaultToast } from 'react-toast-notifications';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CookiesProvider, withCookies } from 'react-cookie';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';

import { store, persistor } from './reducers';
import 'antd/dist/antd.css';
import './App.less';

function App() {
  return (
    <div className="App">
        <p>
          This is the Test
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </div>
  );
}

export default App;
