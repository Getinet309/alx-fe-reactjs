// src/Button.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

test('renders a button with the correct text', () => {
  render(<Button>Click Me</Button>);
  
  // This line will print the rendered HTML to your console
  screen.debug(); 
  
  const buttonElement = screen.getByText(/Click Me/i);
  
  expect(buttonElement).toBeInTheDocument();
});