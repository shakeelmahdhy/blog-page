import React, { useState } from 'react';
import api from '../../api/api';
import './CommentForm.css';

const CommentForm = ({ postId, parentId = null }) => {
  const [text, setText] = useState('');

  const handleComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await api.post('/comments/', { text, post_id: postId, parent_id: parentId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      console.log("Comment added:", response.data);
      setText('');
      window.location.reload();
    } catch (error) {
      console.error('Error adding comment', error);

      if (error.response) {
        console.error("Backend error:", error.response.data);
      } else {
        console.error("Network error:", error.message);
      }
    }
  };
  
  return (
    <form onSubmit={handleComment}>
      <textarea 
        placeholder="Add a comment..." 
        value={text} 
        onChange={e => setText(e.target.value)} 
        required 
      />
      <button type="submit">Comment</button>
    </form>
  );
};

export default CommentForm;
