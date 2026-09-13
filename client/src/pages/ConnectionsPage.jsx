import { useState, useEffect } from 'react';
import { userService } from '../services/dataService';
import { useAuth } from '../hooks/useAuth';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function ConnectionsPage() {
  const { user } = useAuth();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [activeTab, setActiveTab] = useState('following');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConnections();
  }, [user?.id]);

  const loadConnections = async () => {
    try {
      const res = await userService.getConnections(user.id);
      setFollowers(res.data.followers);
      setFollowing(res.data.following);
    } catch (err) {
      console.error('Connections error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await userService.unfollowUser(userId);
      setFollowing(prev => prev.filter(u => u.id !== userId));
    } catch (err) {
      console.error('Unfollow error:', err);
    }
  };

  if (loading) return <LoadingSpinner text="Loading connections..." />;

  const currentList = activeTab === 'followers' ? followers : following;

  return (
    <div className="page-container" style={{ maxWidth: '760px' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">My Network</h1>
          <p className="page-subtitle">Developers you follow and who follow you.</p>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'following' ? 'active' : ''}`} onClick={() => setActiveTab('following')}>
          Following ({following.length})
        </button>
        <button className={`tab ${activeTab === 'followers' ? 'active' : ''}`} onClick={() => setActiveTab('followers')}>
          Followers ({followers.length})
        </button>
      </div>

      {currentList.length === 0 ? (
        <EmptyState
          icon="👥"
          title={activeTab === 'followers' ? 'No followers yet' : 'Not following anyone'}
          description={activeTab === 'followers' ? 'Share your profile to get followers!' : 'Search for developers and start connecting!'}
        />
      ) : (
        <div className="connections-grid">
          {currentList.map(u => (
            <UserCard
              key={u.id}
              user={u}
              action={
                activeTab === 'following' ? (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleUnfollow(u.id)}
                  >
                    Unfollow
                  </button>
                ) : null
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
