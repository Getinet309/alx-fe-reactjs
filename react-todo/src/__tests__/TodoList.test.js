import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

// This runs before each test to ensure a clean state
beforeEach(() => {
  render(<TodoList />);
});

// Test 1: Initial Render
test('renders the initial list of todos', () => {
  const learnReactTodo = screen.getByText(/Learn React/i);
  const buildTodo = screen.getByText(/Build a Todo List/i);
  const writeTestsTodo = screen.getByText(/Write Tests/i);

  expect(learnReactTodo).toBeInTheDocument();
  expect(buildTodo).toBeInTheDocument();
  expect(writeTestsTodo).toBeInTheDocument();
});

// Test 2: Add a new todo
test('allows a user to add a new todo', () => {
  const input = screen.getByPlaceholderText(/Add new todo.../i);
  const addButton = screen.getByText(/Add Todo/i);
  const newTodoText = 'Walk the dog';

  fireEvent.change(input, { target: { value: newTodoText } });
  fireEvent.click(addButton);

  const newTodoItem = screen.getByText(newTodoText);
  expect(newTodoItem).toBeInTheDocument();
  // Verify input is cleared
  expect(input.value).toBe('');
});

// Test 3: Toggle a todo's completion status
test('toggles the completion status of a todo', () => {
  // "Build a Todo List" starts as not completed
  const todoItem = screen.getByText(/Build a Todo List/i);

  // Simulate a click to toggle it
  fireEvent.click(todoItem);

  // The style changes on completion, let's check for the line-through
  // We can check this by verifying the element now has a specific style applied.
  // This is a more advanced check, but a good example.
  expect(todoItem).toHaveStyle('text-decoration: line-through');
});

// Test 4: Delete a todo
test('deletes a todo item', () => {
  const todoText = 'Learn React';
  const todoItem = screen.getByText(todoText);
  const deleteButton = screen.getAllByText('Delete')[0]; // Gets the first "Delete" button

  fireEvent.click(deleteButton);

  // Verify the item is no longer in the document
  expect(todoItem).not.toBeInTheDocument();
  // Alternatively, check using queryByText which returns null if not found
  // expect(screen.queryByText(todoText)).toBeNull();
});