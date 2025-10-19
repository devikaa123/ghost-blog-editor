import React, { useState } from 'react'
import useEditorStore from '../../stores/useEditorStore'

const PostCreator = () => {
  const [title, setTitle] = useState('')
  const { addPost } = useEditorStore()

  const handleCreate = () => {
    if (title.trim()) {
      addPost(title.trim())
      setTitle('')
    }
  }

  return (
    <div className="post-creator">
      <h2>Create New Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title..."
        onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
      />
      <button onClick={handleCreate}>Create Post</button>
    </div>
  )
}

export default PostCreator