import { useQuery } from 'react-query';

// ... (fetchPosts function)

const PostsComponent = () => {
  const { data, status, refetch } = useQuery('posts', fetchPosts);

  if (status === 'loading') {
    return <div>Loading posts...</div>;
  }

  if (status === 'error') {
    return <div>Error fetching data. Please try again.</div>;
  }

  // ... (render data)
};

export default PostsComponent;