import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useEditorStore = create(
  persist(
    (set, get) => ({
      posts: [],
      currentPost: null,
      
      addPost: (title) => {
        const newPost = {
          id: Date.now(),
          title,
          content: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          posts: [newPost, ...state.posts],
          currentPost: newPost
        }))
      },
      
      updatePost: (id, content) => {
        set((state) => ({
          posts: state.posts.map(post =>
            post.id === id ? { ...post, content, updatedAt: new Date().toISOString() } : post
          )
        }))
      },
      
      setCurrentPost: (post) => set({ currentPost: post }),
    }),
    { name: 'blog-storage' }
  )
)

export default useEditorStore