import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Product from './product';
import ColorPicker from './setbackground'
import ColorPicker2 from './prop_backgroundseting';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product" element={<Product />} />
        <Route path="/colorpickers" element={<ColorPicker />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);