import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { postService } from '../services/dataService';
import Avatar from './Avatar';
import CommentSection from './CommentSection';
import { formatDate } from '../utils/helpers';

export default function PostCard({ post, onPostUpdated, onPostDeleted }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(post.is_liked);
  const [likesCount, setLikesCount] = useState(Number(post.likes_count) || 0);
  const [commentsCount, setCommentsCount] = useState(Number(post.comments_count) || 0);
  const [loading, setLoading] = useState(false);

  const isOwner = user?.id === post.user_id;

  const handleLike = async () => {
    try {
      if (liked) {
        await postService.unlikePost(post.id);
        setLiked(false);
        setLikesCount(prev => prev - 1);
      } else {
        await postService.likePost(post.id);
        setLiked(true);
        setLikesCount(prev => prev + 1);
      }
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleEdit = async () => {
    if (!editContent.trim()) return;
    setLoading(true);
    try {
      const res = await postService.updatePost(post.id, { content: editContent });
      onPostUpdated?.(res.data.post);
      setIsEditing(false);
    } catch (err) {
      console.error('Edit error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await postService.deletePost(post.id);
      onPostDeleted?.(post.id);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="post-card fade-in" id={`post-${post.id}`}>
      <div className="post-header">
        <div className="post-user-info">
          <Avatar src={post.user_profile_image} name={post.user_name} />
          <div>
            <div
              className="post-user-name"
              onClick={() => navigate(`/profile/${post.user_id}`)}
            >
              {post.user_name}
            </div>
            <div className="post-time">{formatDate(post.created_at)}</div>
          </div>
        </div>

        {isOwner && (
          <div className="post-menu">
            <button
              className="btn btn-ghost btn-icon"
              onClick={() => setShowMenu(!showMenu)}
            >
              ⋯
            </button>
            {showMenu && (
              <div className="post-menu-dropdown">
                <button
                  className="post-menu-item"
                  onClick={() => { setIsEditing(true); setShowMenu(false); }}
                >
                  ✏️ Edit
                </button>
                <button
                  className="post-menu-item danger"
                  onClick={() => { handleDelete(); setShowMenu(false); }}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div>
          <textarea
            className="edit-post-textarea"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className="edit-post-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => { setIsEditing(false); setEditContent(post.content); }}>
              Cancel
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleEdit} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      ) : (
        <div className="post-content">{post.content}</div>
      )}

      <div className="post-actions">
        <button
          className={`post-action-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          {liked ? '❤️' : '🤍'} {likesCount}
        </button>
        <button
          className="post-action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {commentsCount}
        </button>
      </div>

      {showComments && (
        <CommentSection
          postId={post.id}
          onCommentCountChange={(delta) => setCommentsCount(prev => prev + delta)}
        />
      )}
    </div>
  );
}
