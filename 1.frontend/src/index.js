import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ShopContextProvider } from './contexts/shopContext';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={8}>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </SnackbarProvider>
  </React.StrictMode >
);

reportWebVitals();
