import React from 'react';
import PostsList from '../components/Posts/PostList';

function PostsPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F9FAFB',
      position: 'relative'
    }}>
      <PostsList />
    </div>
  );
}

export default PostsPage;