import { useState, useEffect } from 'react';
import { postService } from '../services/dataService';
import { useAuth } from '../hooks/useAuth';
import Avatar from './Avatar';
import { formatDate } from '../utils/helpers';

export default function CommentSection({ postId, onCommentCountChange }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      const res = await postService.getComments(postId);
      setComments(res.data.comments);
    } catch (err) {
      console.error('Load comments error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const res = await postService.createComment(postId, { content: newComment });
      setComments(prev => [...prev, res.data.comment]);
      setNewComment('');
      onCommentCountChange?.(1);
    } catch (err) {
      console.error('Create comment error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await postService.deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
      onCommentCountChange?.(-1);
    } catch (err) {
      console.error('Delete comment error:', err);
    }
  };

  if (loading) {
    return <div className="comments-section"><div className="spinner spinner-sm" style={{ margin: '16px auto' }} /></div>;
  }

  return (
    <div className="comments-section">
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <Avatar src={comment.user_profile_image} name={comment.user_name} size="sm" />
          <div className="comment-body">
            <div className="comment-header">
              <div>
                <span className="comment-user">{comment.user_name}</span>
                <span className="comment-time" style={{ marginLeft: '8px' }}>{formatDate(comment.created_at)}</span>
              </div>
              {comment.user_id === user?.id && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleDelete(comment.id)}
                  style={{ padding: '2px 6px', fontSize: '12px' }}
                >
                  🗑️
                </button>
              )}
            </div>
            <div className="comment-content">{comment.content}</div>
          </div>
        </div>
      ))}

      <form className="comment-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          disabled={submitting}
        />
        <button className="btn btn-primary btn-sm" type="submit" disabled={submitting || !newComment.trim()}>
          {submitting ? '...' : 'Post'}
        </button>
      </form>
    </div>
  );
}
