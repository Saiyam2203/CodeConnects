import { useState, useEffect } from 'react';
import { postService, userService } from '../services/dataService';
import { useAuth } from '../hooks/useAuth';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import Avatar from '../components/Avatar';
import { useNavigate } from 'react-router-dom';
import { formatDate, truncateText } from '../utils/helpers';

function handleOf(u) {
  if (!u) return '@dev';
  if (u.email) return `@${u.email.split('@')[0]}`;
  return `@${(u.name || 'dev').toLowerCase().replace(/\s+/g, '_')}`;
}

export default function FeedPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [followingIds, setFollowingIds] = useState(new Set());
  const [followBusy, setFollowBusy] = useState(null);
  const [myStats, setMyStats] = useState({ followers: 0, following: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load the feed once. User-dependent data (suggestions, follow state,
  // follower counts) waits until auth has resolved `user`, otherwise the
  // sidebar would show yourself as a suggestion and 0/0 stats.
  useEffect(() => {
    loadFeed();
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    loadSuggestions();
    loadMyStats();
  }, [user?.id]);

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
      const filtered = res.data.users
        .filter(u => u.id !== user?.id)
        .slice(0, 5);
      setSuggestions(filtered);
    } catch (err) {
      console.error('Suggestions error:', err);
    }
  };

  const loadMyStats = async () => {
    if (!user?.id) return;
    try {
      const res = await userService.getConnections(user.id);
      setMyStats({
        followers: res.data.followers?.length || 0,
        following: res.data.following?.length || 0,
      });
      setFollowingIds(new Set((res.data.following || []).map((u) => u.id)));
    } catch (err) {
      console.error('Stats error:', err);
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

  const toggleFollow = async (target) => {
    if (followBusy === target.id) return;
    setFollowBusy(target.id);
    const isFollowing = followingIds.has(target.id);
    try {
      if (isFollowing) {
        await userService.unfollowUser(target.id);
        setFollowingIds((prev) => {
          const next = new Set(prev);
          next.delete(target.id);
          return next;
        });
        setMyStats((s) => ({ ...s, following: Math.max(0, s.following - 1) }));
      } else {
        await userService.followUser(target.id);
        setFollowingIds((prev) => new Set(prev).add(target.id));
        setMyStats((s) => ({ ...s, following: s.following + 1 }));
      }
    } catch (err) {
      console.error('Follow error:', err);
    } finally {
      setFollowBusy(null);
    }
  };

  if (loading) return <LoadingSpinner text="Loading your feed..." />;

  const activity = posts.slice(0, 4);

  const shortcuts = [
    { label: 'My Projects', desc: 'Showcase your work', bg: '#1899f2', icon: '💼', to: '/projects' },
    { label: 'Find Developers', desc: 'Search by skill', bg: '#7c3aed', icon: '🔍', to: '/search' },
    { label: 'My Network', desc: 'Followers & following', bg: '#16a34a', icon: '👥', to: '/connections' },
    { label: 'Edit Profile', desc: 'Bio, skills & links', bg: '#f59e0b', icon: '✏️', to: '/edit-profile' },
  ];

  return (
    <div className="app-layout">
      {/* Left sidebar — profile card + shortcuts like the reference */}
      <aside className="sidebar-left">
        <div className="profile-card">
          <div className="profile-card-cover" />
          <div className="profile-card-body">
            <Avatar src={user?.profile_image} name={user?.name} size="lg" />
            <div className="profile-card-name">{user?.name}</div>
            <div className="profile-card-handle">{handleOf(user)}</div>
            {user?.bio && <div className="profile-card-bio">{user.bio}</div>}
            <div className="stats-row">
              <div className="stat">
                <div className="stat-value">{posts.filter((p) => p.user_id === user?.id).length}</div>
                <div className="stat-label">Posts</div>
              </div>
              <div className="stat">
                <div className="stat-value">{myStats.followers}</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat">
                <div className="stat-value">{myStats.following}</div>
                <div className="stat-label">Following</div>
              </div>
            </div>
            <button className="btn btn-primary btn-full" onClick={() => navigate(`/profile/${user?.id}`)}>
              My Profile
            </button>
          </div>
        </div>

        <div className="side-card">
          <div className="section-head">
            <span className="section-title">Your shortcuts</span>
            <button className="link-blue" onClick={() => navigate('/projects')}>See all</button>
          </div>
          <div className="shortcut-list">
            {shortcuts.map((s) => (
              <button key={s.label} className="shortcut-item" onClick={() => navigate(s.to)}>
                <span className="shortcut-icon" style={{ background: s.bg }}>{s.icon}</span>
                <span>
                  <span style={{ display: 'block', fontSize: '13.5px' }}>{s.label}</span>
                  <span style={{ display: 'block', fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 500 }}>{s.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main feed */}
      <main className="main-content">
        <CreatePost onPostCreated={handlePostCreated} />

        <div className="sort-row">
          Sort by : <strong>Recent ▾</strong>
        </div>

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

      {/* Right sidebar — activity + suggested like the reference */}
      <aside className="sidebar-right">
        <div className="side-card">
          <div className="section-head">
            <span className="section-title">Activity</span>
            <button className="link-blue" onClick={() => navigate('/connections')}>See all</button>
          </div>
          {activity.length === 0 ? (
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No recent activity yet.</div>
          ) : (
            <div className="activity-list">
              {activity.map((p) => (
                <div key={p.id} className="activity-item">
                  <Avatar src={p.user_profile_image} name={p.user_name} size="sm" />
                  <div className="activity-text">
                    <strong>{p.user_name?.split(' ')[0]}</strong> shared a post. <span className="activity-time">{formatDate(p.created_at)}</span>
                    <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>{truncateText(p.content, 60)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="side-card">
          <div className="section-head">
            <span className="section-title">Suggested for you</span>
            <button className="link-blue" onClick={() => navigate('/search')}>See all</button>
          </div>
          <div className="activity-list">
            {suggestions.map((s) => {
              const isFollowing = followingIds.has(s.id);
              return (
                <div key={s.id} className="activity-item">
                  <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${s.id}`)}>
                    <Avatar src={s.profile_image} name={s.name} size="sm" />
                  </span>
                  <div className="activity-text" style={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${s.id}`)}>
                    <strong>{s.name}</strong>
                    <div style={{ color: 'var(--text-muted)' }}>{truncateText(s.skills || 'Developer', 34)}</div>
                  </div>
                  <button
                    className={`follow-btn ${isFollowing ? 'followed' : ''}`}
                    disabled={followBusy === s.id}
                    onClick={() => toggleFollow(s)}
                  >
                    {followBusy === s.id ? '...' : isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              );
            })}
          </div>
          {suggestions.length === 0 && (
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No suggestions right now.</div>
          )}
        </div>
      </aside>
    </div>
  );
}
