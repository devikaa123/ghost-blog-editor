import React from 'react';
import Header from '../components/Editor/Header';
import ImageUpload from '../components/Editor/ImageUpload';
import EditorSection from '../components/Editor/EditorPlaceholder'; // Fixed import name

function EditorPage() {
  return (
    <div style={{
      width: '1440px',
      height: '756px',
      padding: '40px 101px',
      gap: '20px',
      display: 'flex',
      flexDirection: 'column',
      opacity: 1,
      backgroundColor: '#fff',
      margin: '0 auto'
    }}>
      <Header />
      <ImageUpload />
      <EditorSection />
    </div>
  );
}

export default EditorPage;