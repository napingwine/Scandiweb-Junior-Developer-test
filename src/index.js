import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/Redux/store';
import App from './App';
import './style/index.css';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './app/GraphQL/apolloClient';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ApolloProvider client={apolloClient}>
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>
);
