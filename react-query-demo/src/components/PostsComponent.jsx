// src/PostsComponent.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// Function to fetch posts from the API
const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const PostsComponent = () => {
  // useQuery hook to manage fetching and state
  const {
    data: posts, // The fetched data
    isLoading, // Boolean for loading state
    isError, // Boolean for error state
    error, // The error object
    refetch, // Function to manually refetch data
  } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });

  if (isLoading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="posts-container">
      <h1 className="title">Posts</h1>
      <button className="refetch-button" onClick={() => refetch()}>
        Refetch Posts
      </button>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;