import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Product from './product';
import ColorPicker from './setbackground'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Product name="iPhone 13" price={500} rating="4.9/5.0" />
    <ColorPicker />
  </React.StrictMode>
);