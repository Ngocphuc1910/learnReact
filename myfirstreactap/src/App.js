import React from 'react';
import './App.css';
import Product from './product';
import { Link } from 'react-router-dom';


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
            <li><Link to="/colorpicker" style={{ color: 'white' }}>Color Picker</Link></li>
          </ul>
        </nav>
        <Friend />
        <Example />
        <MyList />
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
  const friend = friends[2] //NÓI CHUNG LÀ ADD THÊM 1 LOGIC NỮA Ở ĐÂY TRƯỚC KHI RETURN.
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