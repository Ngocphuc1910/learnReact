import React, { useState, useEffect } from 'react';
import './App.css';

function Input() {
  const [userInput, setUserInput] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [message, setMessage] = useState('');
  const [typingTimer, setTypingTimer] = useState(null);
  
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // useEffect to validate email input
  useEffect(() => {
    // Clear previous timer
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
    
    // Don't validate if the input is empty
    if (!userInput) {
      setIsValid(true);
      setMessage('');
      return;
    }
    
    // Set a new timer to validate after user stops typing for 500ms
    const timer = setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const valid = emailRegex.test(userInput);
      
      setIsValid(valid);
      
      if (valid) {
        setMessage('Email is valid!');
      } else {
        setMessage('Please enter a valid email address');
      }
    }, 1000);
    
    setTypingTimer(timer);
    
    // Cleanup function to clear the timer when component unmounts or when userInput changes
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [userInput]); // This effect runs whenever userInput changes

  return (
    <>
      <div className="emailContainer">
        <h2>Let's stay in touch.</h2>
        <p>Sign up for our newsletter to stay up-to-date on the latest products, receive exclusive discounts, and connect with other programmers who share your passion for all things tech.</p>
        <form>
          <label htmlFor="email">Email: </label>
          <input 
            id="email" 
            type="text" 
            onChange={handleUserInput} 
            value={userInput}
            className={!isValid && userInput ? "invalid-input" : ""}
          />
          {userInput && (
            <p className={isValid ? "valid-message" : "error-message"}>
              {message}
            </p>
          )}
        </form>
      </div>
      <div className="inputDisplay">
        <h2>Current User Input: </h2>
        <h4>{userInput}</h4>
      </div>
    </>
  );
}

export default Input;