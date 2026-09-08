import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Avatar from './Avatar';

export default function CreatePost({ onPostCreated }) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError('Please write something to post.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await onPostCreated(content);
      setContent('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post" id="create-post">
      <div className="create-post-input">
        <Avatar src={user?.profile_image} name={user?.name} />
        <textarea
          value={content}
          onChange={(e) => { setContent(e.target.value); setError(''); }}
          placeholder="What's on your mind? Share an idea, tip, or update..."
          disabled={loading}
        />
      </div>
      {error && <div className="error-message" style={{ marginTop: '8px' }}><span>⚠️</span><span>{error}</span></div>}
      <div className="create-post-actions">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading || !content.trim()}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
}
