import React, { useState, useEffect } from 'react';
import EnhancedEditor from './EnhancedEditor';

const EditorSection = () => {
  const [title, setTitle] = useState('Build your site with CodeDesign and cool web apps!');
  const [saveStatus, setSaveStatus] = useState('Draft - Saved');

  useEffect(() => {
    if (title) {
      setSaveStatus('Saving...');
      const timer = setTimeout(() => {
        setSaveStatus('Draft - Saved');
        
        const statusElement = document.getElementById('save-status');
        if (statusElement) {
          statusElement.textContent = 'Draft - Saved';
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [title]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    }}>
      <div className="editor-container" style={{
        width: '740px',
        maxWidth: '740px',
        minHeight: '500px',
        borderRadius: '8px',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        opacity: 1,
        overflow: 'hidden'
      }}>
        {/* Title Input */}
        <div style={{
          width: '100%',
          height: '60px',
          opacity: 0.1,
          backgroundColor: '#ffffff',
          borderRadius: '8px 8px 0 0',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '0'
        }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700',
              fontSize: '32px',
              lineHeight: '40px',
              color: '#000',
              padding: '0',
              margin: '0',
              backgroundColor: 'transparent'
            }}
          />
        </div>

        {/* Divider Line */}
        <div style={{
          width: '100%',
          height: '0px',
          opacity: 1,
          border: '1px solid #D1D5DC',
          margin: '0'
        }}></div>

        {/* Enhanced Editor */}
        <EnhancedEditor />

        {/* Hidden element for save status communication */}
        <div style={{ display: 'none' }} id="save-status">
          {saveStatus}
        </div>
      </div>
    </div>
  );
};

export default EditorSection;