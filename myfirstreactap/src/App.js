import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React App</h1>
        <p>
          Your React application is running successfully on localhost:3000
        </p>
        <Friend />
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
  const friend = friends[0] //NÓI CHUNG LÀ ADD THÊM 1 LOGIC NỮA Ở ĐÂY TRƯỚC KHI RETURN.
  return(<div>
  <h1>{friend.title}</h1>
  <img
  src = {friend.src} />
  </div>)
}

export default App;
