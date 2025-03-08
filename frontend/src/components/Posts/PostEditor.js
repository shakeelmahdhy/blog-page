import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import './PostEditor.css';

const PostEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const res = await api.get(`/posts/${postId}`);
          setTitle(res.data.title);
          setContent(res.data.content);
        } catch (error) {
          console.error('Error fetching post for editing', error);
        }
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (postId) {
        await api.put(`/posts/${postId}`, { title, content }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await api.post('/posts/', { title, content }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving post', error);
    }
  };

  return (
    <div className="post-editor-container">
      <h2>{postId ? 'Edit Post' : 'New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Post Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required 
        /><br/>
        <textarea 
          placeholder="Write your post here..." 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          required 
        /><br/>
        <button type="submit">{postId ? 'Update' : 'Publish'}</button>
      </form>
    </div>
  );
};

export default PostEditor;
