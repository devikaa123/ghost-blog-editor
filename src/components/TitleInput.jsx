import React from 'react';

const TitleInput = () => {
  return (
    <div className="title-input" style={{ marginBottom: '20px' }}>
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
          margin: '0'
        }}
      />
    </div>
  );
};

export default TitleInput;