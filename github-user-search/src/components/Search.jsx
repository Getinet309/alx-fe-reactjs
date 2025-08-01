import React, { useState } from 'react';
import { searchUsers, fetchUserData } from '../services/githubService';

const Search = () => {
  // State variables for the search form inputs
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');

  // State variables for the search results and API status
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null); // For single user results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(true); // Toggle for search mode

  /**
   * Handles the form submission for the advanced, multi-user search.
   * @param {Event} e - The form submission event.
   */
  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUsers([]);
    setUser(null);
    setNextPage(null);

    try {
      const { items, nextPageLink } = await searchUsers({
        username,
        location,
        minRepos,
      });
      setUsers(items);
      setNextPage(nextPageLink);
    } catch (err) {
      setError('Looks like we cannot find any users with those criteria.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the form submission for the basic, single-user search.
   * @param {Event} e - The form submission event.
   */
  const handleSimpleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUsers([]);
    setUser(null);

    try {
      const userData = await fetchUserData(username);
      setUser(userData);
    } catch (err) {
      setError('Looks like we can\'t find the user.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  /**
   * Handles loading more results from the next page of the API.
   */
  const loadMore = async () => {
    setLoading(true);
    try {
      // Pass the next page URL to the searchUsers service
      const { items, nextPageLink } = await searchUsers({
        username,
        location,
        minRepos,
        url: nextPage,
      });
      setUsers((prevUsers) => [...prevUsers, ...items]);
      setNextPage(nextPageLink);
    } catch (err) {
      setError('Failed to load more users.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Search Mode Toggle */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsAdvancedSearch(false)}
          className={`py-2 px-4 rounded-l-md border-r-0 transition duration-300 ${!isAdvancedSearch ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Basic Search
        </button>
        <button
          onClick={() => setIsAdvancedSearch(true)}
          className={`py-2 px-4 rounded-r-md transition duration-300 ${isAdvancedSearch ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Advanced Search
        </button>
      </div>

      {/* Conditional Search Form */}
      {isAdvancedSearch ? (
        <form onSubmit={handleAdvancedSearch} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Advanced GitHub User Search</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username (e.g., 'octocat')"
              className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (e.g., 'San Francisco')"
              className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="Min Repositories (e.g., '10')"
              className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </form>
      ) : (
        <form onSubmit={handleSimpleSearch} className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Basic GitHub User Search</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </form>
      )}

      {/* Loading, Error, and Results Display */}
      {loading && <p className="text-center text-blue-600 my-4">Loading...</p>}
      {error && <p className="text-center text-red-600 my-4">{error}</p>}

      {/* Conditional rendering for single user or multiple users */}
      {user && !isAdvancedSearch && (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center max-w-md mx-auto">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold">{user.login}</h3>
          <p className="text-gray-500">{user.name}</p>
          <p className="text-gray-500">{user.location}</p>
          <p className="text-gray-500">Public Repos: {user.public_repos}</p>
          <p className="text-gray-500">Followers: {user.followers}</p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-2"
          >
            View Profile
          </a>
        </div>
      )}

      {users.length > 0 && isAdvancedSearch && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}

      {/* "Load More" button for pagination */}
      {nextPage && isAdvancedSearch && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
            disabled={loading}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
