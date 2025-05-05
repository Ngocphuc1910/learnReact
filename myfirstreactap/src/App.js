import React from 'react';
import './App.css';
import Product from './product';
import { Link } from 'react-router-dom';
import Input from './form';
import { useTheme } from './ThemeContext';
import TodoList from './ToDoList';
import MemoExample from './MemoExample';
import useThemeManager from './useThemeManager';
import Login from './login';
import LifecycleExample from './LifecycleExample';
import AsyncAwaitDemo from './AsyncAwaitDemo';

// Simple component to display current theme from context
function ThemeDisplay() {
  const { theme, toggleTheme } = useThemeManager();
  
  return (
    <div className="theme-display" style={{ 
      padding: '10px', 
      margin: '10px', 
      border: '1px solid white',
      backgroundColor: theme.color,
      color: theme.textColor
    }}>
      <h3>Current Theme Color: {theme.color}</h3>
      <p>This component is using the shared theme context.</p>
      <button onClick={toggleTheme} style={{ marginTop: '10px' }}>Toggle Theme</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React App</h1>
        <p>
          Your React application is running successfully on localhost:3000
        </p>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
            <li><Link to="/" style={{ color: 'white' }}>Home</Link></li>
            <li><Link to="/product" style={{ color: 'white' }}>Product</Link></li>
            <li><Link to="/colorpicker" style={{ color: 'white' }}>Color Pickera</Link></li>
            <li><Link to="/form" style={{ color: 'white'}}>Open Form</Link></li>
            <li><Link to="/todolist" style={{ color: 'white'}}>Open Todo List</Link></li>
            <li><Link to="/search" style={{ color: 'white'}}>Search (useCallback)</Link></li>
            <li><Link to="/memo" style={{ color: 'white'}}>Memo Example</Link></li>
            <li><Link to="/login" style={{ color: 'white'}}>Login</Link></li>
            <li><Link to="/lifecycle" style={{ color: 'white'}}>Lifecycle</Link></li>
            <li><Link to="/async" style={{ color: 'white'}}>Async/Await</Link></li>
          </ul>
        </nav>
        <ThemeDisplay />
        <Friend />
        <Example />
        <MyList />
        <MemoExample />
      </header>
    </div>
  );
}

const friends = [
  {
    title: "Yummmmmmm",
    src: "https://content.codecademy.com/courses/React/react_photo-monkeyweirdo.jpg"
  },
  {
    title: "Hey Guys! Wait Up!",
    src: "https://content.codecademy.com/courses/React/react_photo-earnestfrog.jpg"
  },
  {
    title: "Yikes",
    src: "https://content.codecademy.com/courses/React/react_photo-alpaca.jpg"
  }
];

// New function component starts here:
function Friend() {
  const friend = friends[1] //NÓI CHUNG LÀ ADD THÊM 1 LOGIC NỮA Ở ĐÂY TRƯỚC KHI RETURN.
  return(
    <div className="friend-container">
      <h1 className="friend-title">{friend.title}</h1>
      <img 
        className="friend-image"
        src={friend.src} 
        alt={friend.title}
      />
    </div>
  )
};

function Example() {
  function handleEvent() {
    alert(`I am an event handler.
      If you see this message,
      then I have been called.`);
  }
  return (
      <h1 onClick={handleEvent}>
        Hello world
      </h1>
    );
}

const myArray = ['apple', 'banana', 'orange'];

const myList = myArray.map((item) => <p>{item}</p>)

function MyList() {
  return (
    <div>
      {myList}
    </div>
  )
}

export default App;