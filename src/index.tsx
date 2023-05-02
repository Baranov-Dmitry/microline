import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CountContextProvider } from './store/СountReduser';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <CountContextProvider>
    <App />
  </CountContextProvider>
);
