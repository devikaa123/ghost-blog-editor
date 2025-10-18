import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import EditorPage from './pages/EditorPage';
import PostsPage from './pages/PostsPage';
import './App.css';


      


// Main App Component
function App() {
  return (
    <Router>
      <div className="app">
      
        <Routes>
          {/* Redirect root to editor */}
        
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/" element={<PostsPage />} />
          {/* Catch all route - redirect to editor */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;