import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Product from './product';
import ColorPicker from './setbackground'
import ColorPicker2 from './prop_backgroundseting';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Input from './form';
import { ThemeProvider } from './ThemeContext';
import TodoList from './ToDoList';
import SearchComponent from './SearchComponent'; // Import the new component
import MemoExample from './MemoExample';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/product" element={<Product />} />
          <Route path="/colorpicker" element={<ColorPicker />} />
          <Route path="/form" element={<Input />} />
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/search" element={<SearchComponent />} />
          <Route path="/memo" element={<MemoExample />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);