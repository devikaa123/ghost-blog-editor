import React from 'react';

const EditorSection = () => {
  return (
    <div className="editor-frame" style={{
      width: '1238px',
      height: '300px',
      opacity: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <div className="editor-container" style={{
        width: '740px',
        maxWidth: '740px',
        height: '300px',
        borderRadius: '8px',
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        opacity: 1
      }}>
        {/* Title Input */}
        <input
          type="text"
          placeholder="Post title"
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '32px',
            fontWeight: '700',
            color: '#000',
            padding: '0',
            margin: '0',
            fontFamily: 'Inter, sans-serif'
          }}
        />
        
        {/* Editor Content */}
        <div className="editor-content" style={{
          width: '100%',
          minHeight: '200px',
          border: 'none',
          outline: 'none',
          fontSize: '16px',
          color: '#6b7280',
          padding: '0',
          margin: '0',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.6'
        }}>
          Begin writing your post...
        </div>
      </div>
    </div>
  );
};

export default EditorSection;