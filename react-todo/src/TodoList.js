import React, { useState } from 'react';

// A simple CSS module for styling.
// In a real project, you'd probably use a separate file.
const styles = {
  completed: {
    textDecoration: 'line-through',
    color: 'gray',
  },
  todoItem: {
    cursor: 'pointer',
    padding: '5px',
    borderBottom: '1px solid #eee',
  },
  deleteButton: {
    marginLeft: '10px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  }
};

const initialTodos = [
  { id: 1, text: 'Learn React', completed: true },
  { id: 2, text: 'Build a Todo List', completed: false },
  { id: 3, text: 'Write Tests', completed: false },
];

function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    const newTodo = {
      id: Date.now(), // Simple unique ID
      text: newTodoText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>My Todo List</h1>
      <form onSubmit={addTodo} aria-label="Add new todo form">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add new todo..."
          aria-label="New todo text"
        />
        <button type="submit">Add Todo</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={todo.completed ? styles.completed : styles.todoItem}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents li's onClick from firing
                deleteTodo(todo.id);
              }}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;