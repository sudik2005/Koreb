/**
 * KOREB — Natural Cosmetics
 * src/main.jsx
 * Application entry point rendering App in React.StrictMode with global base and responsive styles.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/base.css';
import './styles/responsive.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
