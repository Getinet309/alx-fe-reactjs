import React, { useState } from 'react';

// The main App component that renders the RegistrationForm.
// It's a common pattern to wrap the main component in an App component for execution.
const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <RegistrationForm />
    </div>
  );
};

// The core RegistrationForm component.
// It manages the state for each form field and handles form submission with validation.
const RegistrationForm = () => {
  // State hooks for each form input field.
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State hook to manage error messages for validation.
  const [error, setError] = useState('');

  // The handleSubmit function is called when the form is submitted.
  const handleSubmit = (event) => {
    // Prevent the default form submission behavior which would reload the page.
    event.preventDefault();

    // Basic validation: check if any of the fields are empty.
    if (!username || !email || !password) {
      setError('All fields are required.');
      return; // Stop the function if validation fails.
    }

    // If validation passes, clear any previous error messages.
    setError('');

    // Log the form data to the console.
    // In a real application, you would send this data to a backend server.
    console.log('Form submitted successfully!');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    // Reset the form fields after successful submission.
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
      
      {/* Display the error message if the error state is not empty. */}
      {error && (
        <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 w-full"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
