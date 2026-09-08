import { useState, useEffect } from 'react';
import { postService, userService } from '../services/dataService';
import { useAuth } from '../hooks/useAuth';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import Avatar from '../components/Avatar';
import { useNavigate } from 'react-router-dom';

export default function FeedPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFeed();
    loadSuggestions();
  }, []);

  const loadFeed = async () => {
    try {
      const res = await postService.getPosts();
      setPosts(res.data.posts);
    } catch (err) {
      setError('Unable to load feed.');
    } finally {
      setLoading(false);
    }
  };

  const loadSuggestions = async () => {
    try {
      const res = await userService.getUsers();
      // Show users the current user isn't (limit to 5)
      const filtered = res.data.users
        .filter(u => u.id !== user?.id)
        .slice(0, 5);
      setSuggestions(filtered);
    } catch (err) {
      console.error('Suggestions error:', err);
    }
  };

  const handlePostCreated = async (content) => {
    const res = await postService.createPost({ content });
    setPosts(prev => [res.data.post, ...prev]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const handlePostDeleted = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  if (loading) return <LoadingSpinner text="Loading your feed..." />;

  return (
    <div className="app-layout">
      {/* Left sidebar - hidden on mobile via CSS */}
      <aside className="sidebar-left">
        <div className="card" style={{ marginBottom: '16px', cursor: 'pointer' }} onClick={() => navigate(`/profile/${user?.id}`)}>
          <div style={{ textAlign: 'center' }}>
            <Avatar src={user?.profile_image} name={user?.name} size="xl" />
            <h3 style={{ marginTop: '12px', fontSize: '16px' }}>{user?.name}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{user?.bio || 'Developer'}</p>
          </div>
        </div>
      </aside>

      {/* Main feed */}
      <main className="main-content">
        <CreatePost onPostCreated={handlePostCreated} />

        {error && <div className="error-message"><span>⚠️</span><span>{error}</span></div>}

        {posts.length === 0 ? (
          <EmptyState
            icon="📝"
            title="No posts yet"
            description="Be the first to share something with the community!"
          />
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onPostUpdated={handlePostUpdated}
              onPostDeleted={handlePostDeleted}
            />
          ))
        )}
      </main>

      {/* Right sidebar - suggestions */}
      <aside className="sidebar-right">
        <div className="suggestions-section">
          <h3 className="suggestions-title">Suggested Developers</h3>
          {suggestions.map(s => (
            <div
              key={s.id}
              className="suggestion-card"
              onClick={() => navigate(`/profile/${s.id}`)}
            >
              <Avatar src={s.profile_image} name={s.name} size="sm" />
              <div className="suggestion-info">
                <div className="suggestion-name">{s.name}</div>
                <div className="suggestion-skills">{s.skills || 'Developer'}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
