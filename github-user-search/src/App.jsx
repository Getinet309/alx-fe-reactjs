import React, { useState } from 'react';

// Main App component that orchestrates the entire application.
const App = () => {
  // Use state hooks to manage the application's data and UI state.
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * githubService.js
   * Function to fetch user data from the GitHub API.
   * This is defined here to keep the code in a single self-contained file,
   * fulfilling the request for a separate service function.
   * @param {string} username The GitHub username to search for.
   * @returns {Promise<object|null>} A promise that resolves with user data or null on error.
   */
  const fetchUserData = async (username) => {
    // FIX: The `import.meta.env` syntax caused a compilation error.
    // We are replacing it with a simple constant for this environment.
    // In a real Vite app, the original line would be correct.
    const apiKey = ""; 
    const url = `https://api.github.com/users/${username}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': apiKey ? `token ${apiKey}` : undefined,
        },
      });
      
      // Check if the response is successful (status code 200).
      if (!response.ok) {
        // If the user is not found, the API returns a 404 status.
        throw new Error('User not found.');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("API call failed:", err);
      return null;
    }
  };

  /**
   * Handles the form submission event.
   * This function triggers the API call and manages the state.
   * @param {Event} e The form submission event.
   */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) {
      setError("Please enter a username.");
      setUserData(null);
      return;
    }

    setLoading(true);
    setError(null);
    setUserData(null);

    const user = await fetchUserData(searchTerm);

    if (user) {
      setUserData(user);
    } else {
      setError("Looks like we can't find the user.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          GitHub User Search
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter a GitHub username to find their profile information.
        </p>

        {/* Step 1: Search Input Setup */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g., octocat"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Search
          </button>
        </form>

        {/* Step 3: Conditional Rendering for Displaying Search Results */}
        {loading && (
          <div className="text-center text-gray-500 text-lg">
            Loading...
          </div>
        )}

        {error && !loading && (
          <div className="text-center text-red-500 text-lg">
            {error}
          </div>
        )}

        {userData && !loading && (
          <div className="bg-gray-50 p-6 rounded-2xl shadow-inner flex flex-col sm:flex-row items-center gap-6">
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-semibold text-gray-800">{userData.name || userData.login}</h2>
              <p className="text-blue-600">
                <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                  @{userData.login}
                </a>
              </p>
              <p className="text-gray-600 mt-2">{userData.bio || 'No bio available.'}</p>
              <div className="flex justify-center sm:justify-start gap-4 mt-4 text-sm text-gray-500">
                <span>Followers: {userData.followers}</span>
                <span>Following: {userData.following}</span>
                <span>Public Repos: {userData.public_repos}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
