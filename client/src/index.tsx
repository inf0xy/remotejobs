import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import App from './components/App';
import './styles.css';
import { JobProvider } from './context/jobSearch';
import { UserProvider } from './context/user';

TimeAgo.addDefaultLocale(en);

const APP_URL = process.env.APP_URL;

const client = new ApolloClient({
  uri: `${APP_URL}/graphql`,
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <ApolloProvider client={client}>
    <UserProvider>
      <JobProvider>
        <App/>
      </JobProvider>
    </UserProvider>
  </ApolloProvider>
);