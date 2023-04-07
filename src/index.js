import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './api/apiSlice';
import './styles/normalize.scss';
import './styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>
);
