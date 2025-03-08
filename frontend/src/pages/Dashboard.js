import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({ user: {}, posts: [], comments: [] });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/users/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDashboardData(res.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {dashboardData.user.name || 'User'}!</h2>
        <p className="dashboard-description">Manage your posts, comments, and more</p>
      </div>

      <div className="dashboard-section">
        <h3>Your Posts</h3>
        <div className="post-list">
          {dashboardData.posts && dashboardData.posts.map(post => (
            <div className="post-card" key={post.id}>
              <Link to={`/post/${post.id}`} className="post-title">
                <h4>{post.title}</h4>
              </Link>
              <p className="post-preview">{post.content.substring(0, 150)}...</p>
              <Link to={`/post/${post.id}`} className="view-post-link">View Post</Link>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Your Comments</h3>
        <div className="comment-list">
          {dashboardData.comments && dashboardData.comments.map(comment => (
            <div className="comment-card" key={comment.id}>
              <p className="comment-text">{comment.text}</p>
              <small className="comment-info">(on post ID: {comment.post_id})</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
