import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './Toolbar'
import useEditorStore from '../../stores/useEditorStore'

const RichTextEditor = () => {
  const { currentPost, updatePost } = useEditorStore()
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: currentPost?.content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      if (currentPost) {
        updatePost(currentPost.id, html)
      }
    },
  })

  if (!editor) return <div>Loading editor...</div>

  return (
    <div className="editor">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />
    </div>
  )
}

export default RichTextEditor