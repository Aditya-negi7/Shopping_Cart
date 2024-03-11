import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { CartProvider } from './context/cart.jsx'
import { Toaster } from 'react-hot-toast';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
  <BrowserRouter>
    <CartProvider>
      <App />
      <Toaster />
    </CartProvider>
  </BrowserRouter>
  </StrictMode>
);