import axios from 'axios';

const GITHUB_SEARCH_API_URL = 'https://api.github.com/search/users';

export const searchUsers = async ({ username, location, minRepos, url = null }) => {
  try {
    let requestUrl = url;

    // If no URL is provided, construct the initial search query
    if (!requestUrl) {
      let query = '';

      if (username) {
        query += username;
      }
      if (location) {
        query += `+location:${location}`;
      }
      if (minRepos) {
        query += `+repos:>=${minRepos}`;
      }

      if (!query) {
        throw new Error('Please enter at least one search criterion.');
      }

      requestUrl = `${GITHUB_SEARCH_API_URL}?q=${query}&per_page=30`;
    }

    const response = await axios.get(requestUrl);

    // Extract next page link from the response headers for pagination
    let nextPageLink = null;
    const linkHeader = response.headers.link;
    if (linkHeader) {
      const nextLinkMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
      if (nextLinkMatch) {
        nextPageLink = nextLinkMatch[1];
      }
    }

    return {
      items: response.data.items,
      nextPageLink,
    };
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw error;
  }
};