import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './CommentList.css';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.error('Error fetching comments', error);
      }
    };
    fetchComments();
  }, [postId]);

  const renderComments = (commentList, level = 0) =>
    commentList.map(comment => (
      <div key={comment.id} className="comment-container">
        <div className="comment" style={{ marginLeft: level * 20 }}>
          <p><strong>{comment.owner.email}</strong>: {comment.text}</p>
          {comment.replies && comment.replies.length > 0 && (
            <div className="replies">
              {renderComments(comment.replies, level + 1)}
            </div>
          )}
        </div>
      </div>
    ));

  return (
    <div>
      {comments && comments.length > 0 ? renderComments(comments) : <p className="no-comments">No comments yet.</p>}
    </div>
  );
};

export default CommentList;
