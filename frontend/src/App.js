import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PostList from './components/Posts/PostList';
import PostDetail from './components/Posts/PostDetail';
import PostEditor from './components/Posts/PostEditor';
import './App.css'; // Import App-specific styles
import CreateBlog from './pages/CreateBlog';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="logo">BlogSite</Link>
        </div>
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          <Link to="/posts" className="navbar-link">Blogs</Link>
          <Link to="/profile" className="navbar-link">Profile</Link>
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/signup" className="navbar-link">Signup</Link>
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          &#9776;
        </div>
      </nav>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/post/edit/:postId" element={<PostEditor />} />
          <Route path="/post/new" element={<PostEditor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<CreateBlog />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
