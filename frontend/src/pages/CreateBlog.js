import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      setError("You must be logged in to create a blog.");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/posts',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Blog created:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating blog:', error);
      if (error.response) {
        setError(error.response.data.detail || "An error occurred.");
      } else {
        setError("An error occurred.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleCreateBlog}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full mb-4"
          rows="6"
          required
        ></textarea>
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
