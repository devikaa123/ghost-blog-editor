import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePostStore = create(
  persist(
    (set, get) => ({
      // Initial state
      posts: [],
      
      // Actions
      addPost: (post) => {
        const newPost = {
          id: Date.now(), // Simple ID generation
          createdAt: new Date().toISOString(),
          ...post
        };
        
        set((state) => ({
          posts: [newPost, ...state.posts]
        }));
        
        return newPost.id;
      },
      
      updatePost: (id, updatedPost) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, ...updatedPost, updatedAt: new Date().toISOString() } : post
          )
        }));
      },
      
      deletePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id)
        }));
      },
      
      getPost: (id) => {
        return get().posts.find((post) => post.id === id);
      },
      
      // Clear all posts (for testing)
      clearPosts: () => {
        set({ posts: [] });
      },
      
      // Get posts with pagination
      getPosts: (page = 1, limit = 10) => {
        const posts = get().posts;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return posts.slice(startIndex, endIndex);
      }
    }),
    {
      name: 'post-storage', // name of the item in localStorage
      getStorage: () => localStorage, // use localStorage
    }
  )
);

export default usePostStore;