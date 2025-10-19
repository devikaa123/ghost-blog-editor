import React from 'react';
import Header from '../components/Editor/Header';
import ImageUpload from '../components/Editor/ImageUpload';
import EditorSection from '../components/Editor/EditorPlaceholder';


function EditorPage() {
  return (
    <div style={{
      width: '1440px',
      minHeight: '100vh',
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