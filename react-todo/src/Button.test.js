// src/Button.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // This gives you matchers like toBeInTheDocument
import Button from './Button'; // Import the component you want to test

// Your test code goes here
test('renders a button with the correct text', () => {
  render(<Button>Click Me</Button>);

  const buttonElement = screen.getByText(/Click Me/i);

  expect(buttonElement).toBeInTheDocument();
});