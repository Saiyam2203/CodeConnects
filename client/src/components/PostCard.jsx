import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { postService } from '../services/dataService';
import Avatar from './Avatar';
import CommentSection from './CommentSection';
import { formatDate } from '../utils/helpers';

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
    </svg>
  );
}

function formatCount(n) {
  const num = Number(n) || 0;
  if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return `${num}`;
}

/** Render #hashtags in accent blue like the reference */
function renderContent(content) {
  if (!content) return null;
  const parts = content.split(/(#[\w-]+)/g);
  return parts.map((p, i) =>
    p.startsWith('#') && p.length > 1
      ? <span key={i} className="hashtag">{p}</span>
      : <span key={i}>{p}</span>
  );
}

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
              aria-label="Post options"
            >
              ⋮
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
        <div className="post-content">{renderContent(post.content)}</div>
      )}

      <div className="post-actions">
        <button
          className={`post-action-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label="Like post"
        >
          <HeartIcon filled={liked} /> {formatCount(likesCount)}
        </button>
        <button
          className="post-action-btn"
          onClick={() => setShowComments(!showComments)}
          aria-label="Toggle comments"
        >
          <CommentIcon /> {formatCount(commentsCount)}
        </button>
        <button
          className="post-action-btn post-share-btn"
          title="Share (copies link)"
          onClick={() => {
            const url = `${window.location.origin}/feed#post-${post.id}`;
            navigator.clipboard?.writeText(url).catch(() => {});
          }}
          aria-label="Share post"
        >
          <ShareIcon />
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
