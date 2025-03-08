import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommentList from '../Comments/CommentList';
import CommentForm from '../Comments/CommentForm';
import './PostDetail.css';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${postId}`);
        setPost(res.data);

        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && res.data.owner.email === currentUser.email) {
          setIsOwner(true);
        }
      } catch (error) {
        console.error('Error fetching post', error);
      }
    };
    fetchPost();
  }, [postId]);

  const addReaction = async (type) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.post('/reactions/', { type, post_id: post.id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReactions([...reactions, res.data]);
    } catch (error) {
      console.error('Error adding reaction', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail-container">
      <Link to="/" className="back-link">← Back to Posts</Link>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p className="post-owner">By: {post.owner.email}</p>
      
      <div className="reaction-buttons">
        <button onClick={() => addReaction('like')}>Like</button>
        <button onClick={() => addReaction('dislike')}>Dislike</button>
      </div>

      {isOwner && (
        <div className="post-actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      <div className="comment-section">
        <h3>Comments</h3>
        <CommentList postId={post.id} />
        <CommentForm postId={post.id} />
      </div>
    </div>
  );
};

export default PostDetail;
