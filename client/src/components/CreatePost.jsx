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
      <div className="composer-top">
        <Avatar src={user?.profile_image} name={user?.name} />
        <div className="composer-pill">
          <textarea
            value={content}
            rows={1}
            onChange={(e) => { setContent(e.target.value); setError(''); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit();
            }}
            placeholder="Share something... #code #devlife"
            disabled={loading}
            aria-label="Create a post"
          />
          <button
            type="button"
            className="composer-smile"
            title="Add emoji"
            onClick={() => setContent((c) => (c ? `${c} 😊` : '😊 '))}
          >
            ☺
          </button>
        </div>
      </div>

      {error && <div className="error-message" style={{ marginTop: '10px' }}><span>⚠️</span><span>{error}</span></div>}

      <div className="composer-options">
        <button type="button" className="composer-option" title="Photo posts coming soon">
          <span className="ic">🖼️</span> Image
        </button>
        <button type="button" className="composer-option" title="Video posts coming soon">
          <span className="ic">🎬</span> Video
        </button>
        <button type="button" className="composer-option" title="Polls coming soon">
          <span className="ic">📊</span> Poll
        </button>
        <span className="visibility-pill" title="Post visibility">🌐 Public ▾</span>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleSubmit}
          disabled={loading || !content.trim()}
          style={{ marginLeft: '8px' }}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
}
