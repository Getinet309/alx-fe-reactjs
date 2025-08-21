import React from 'react';
import { useQuery } from 'react-query';

// A simple asynchronous function to fetch data from the API.
const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

// This is the component that uses React Query to fetch and display the posts.
const PostsComponent = () => {
  // The useQuery hook manages the data fetching lifecycle.
  // It takes a unique key ('posts') and the async function to fetch data.
  const { data, isLoading, isError, refetch } = useQuery('posts', fetchPosts, {
    // staleTime sets how long data is considered "fresh" before a background refetch is triggered.
    staleTime: 5000,
  });

  // Conditional rendering based on the query state.
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-lg text-gray-700">Loading posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-lg text-red-500">Error fetching data. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Posts</h2>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Refetch Data
        </button>
      </div>
      <ul className="space-y-6">
        {/* We slice the data to show only the first 10 posts for a cleaner UI. */}
        {data.slice(0, 10).map((post) => (
          <li key={post.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
