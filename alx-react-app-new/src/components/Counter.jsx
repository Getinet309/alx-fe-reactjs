// src/components/Counter.jsx

import React, { useState } from 'react';

function Counter() {
  // Initialize state using useState.
  // 'count' is the current state value.
  // 'setCount' is the function to update the state.
  // The initial value of count is 0.
  const [count, setCount] = useState(0);

  // Define inline styles for the container and buttons for visual appeal
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
    margin: '50px auto',
    border: '2px solid #007bff',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#e0f7fa', // Light blue background
    maxWidth: '400px',
    fontFamily: 'Arial, sans-serif',
  };

  const countDisplayStyle = {
    fontSize: '3em',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '25px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '15px', // Space between buttons
  };

  const buttonStyle = {
    padding: '12px 25px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    color: '#fff',
  };

  // Specific styles for each button type
  const incrementButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745', // Green for increment
  };

  const decrementButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545', // Red for decrement
  };

  const resetButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d', // Grey for reset
  };

  // Event handlers for button clicks
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1); // Use functional update for safety
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1); // Use functional update for safety
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div style={containerStyle}>
      {/* Display the current count */}
      <p style={countDisplayStyle}>Count: {count}</p>

      <div style={buttonContainerStyle}>
        {/* Button to increment the count */}
        <button
          style={incrementButtonStyle}
          onClick={handleIncrement}
        >
          Increment
        </button>

        {/* Button to decrement the count */}
        <button
          style={decrementButtonStyle}
          onClick={handleDecrement}
        >
          Decrement
        </button>

        {/* Button to reset the count to 0 */}
        <button
          style={resetButtonStyle}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
