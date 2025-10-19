import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import BookmarkComponent from '../components/BookmarkComponent';

export const Bookmark = Node.create({
  name: 'bookmark',
  group: 'block',
  atom: true,
  
  addAttributes() {
    return {
      url: {
        default: '',
      },
      title: {
        default: '',
      },
      description: {
        default: '',
      },
      image: {
        default: '',
      },
      siteName: {
        default: '',
      },
      loading: {
        default: false,
      },
      error: {
        default: false,
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-bookmark]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-bookmark': '', ...HTMLAttributes }]
  },

  addNodeView() {
    return ReactNodeViewRenderer(BookmarkComponent)
  },

  addCommands() {
    return {
      setBookmark: (attributes) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        })
      },
    }
  },
})