import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const userData = await fetchUserData(username);
      setUser(userData);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button type="submit">Search</button>
      </form>

      <div className="results-container">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {user && (
          <div className="user-card">
            <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
            <h3>{user.name || user.login}</h3>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
            <p>Public Repos: {user.public_repos}</p>
            <p>Followers: {user.followers}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
