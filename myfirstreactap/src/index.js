import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Product from './product';
import ColorPicker from './setbackground'
import ColorPicker2 from './prop_backgroundseting';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Input from './form';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product" element={<Product />} />
        <Route path="/colorpicker" element={<ColorPicker />} />
        <Route path="/form" element={<Input />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);