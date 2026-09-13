import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService, postService, projectService } from '../services/dataService';
import { useAuth } from '../hooks/useAuth';
import Avatar from '../components/Avatar';
import PostCard from '../components/PostCard';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { parseSkills } from '../utils/helpers';

export default function ProfilePage() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const isOwnProfile = currentUser?.id === parseInt(id);

  useEffect(() => {
    loadProfile();
  }, [id]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const [userRes, postsRes, projectsRes] = await Promise.all([
        userService.getUserById(id),
        postService.getPostsByUser(id),
        projectService.getProjectsByUser(id)
      ]);
      setProfile(userRes.data.user);
      setIsFollowing(userRes.data.user.isFollowing);
      setPosts(postsRes.data.posts);
      setProjects(projectsRes.data.projects);
    } catch (err) {
      console.error('Profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      if (isFollowing) {
        await userService.unfollowUser(id);
        setIsFollowing(false);
        setProfile(prev => ({ ...prev, followers_count: (prev.followers_count || 1) - 1 }));
      } else {
        await userService.followUser(id);
        setIsFollowing(true);
        setProfile(prev => ({ ...prev, followers_count: (prev.followers_count || 0) + 1 }));
      }
    } catch (err) {
      console.error('Follow error:', err);
    } finally {
      setFollowLoading(false);
    }
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const handlePostDeleted = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  if (loading) return <LoadingSpinner text="Loading profile..." />;
  if (!profile) return <div className="page-container" style={{ maxWidth: '800px' }}><EmptyState icon="👤" title="User not found" /></div>;

  const skills = parseSkills(profile.skills);
  const handle = profile.email ? `@${profile.email.split('@')[0]}` : `@user${profile.id}`;

  return (
    <div className="page-container" style={{ maxWidth: '860px' }}>
      <div className="profile-header slide-up">
        <div className="profile-cover" />
        <div className="profile-info">
          <Avatar src={profile.profile_image} name={profile.name} size="2xl" />
          <div className="profile-details">
            <h1 className="profile-name">{profile.name}</h1>
            <div className="profile-handle">{handle}</div>
            {profile.bio && <p className="profile-bio">{profile.bio}</p>}

            <div className="profile-stats">
              <div className="profile-stat">
                <div className="profile-stat-value">{posts.length}</div>
                <div className="profile-stat-label">Posts</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-value">{profile.followers_count || 0}</div>
                <div className="profile-stat-label">Followers</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-value">{profile.following_count || 0}</div>
                <div className="profile-stat-label">Following</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-value">{projects.length}</div>
                <div className="profile-stat-label">Projects</div>
              </div>
            </div>

            <div className="profile-links">
              {profile.github_url && (
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="profile-link">
                  ⚡ GitHub
                </a>
              )}
              {profile.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="profile-link">
                  💼 LinkedIn
                </a>
              )}
            </div>

            {skills.length > 0 && (
              <div className="skills-list">
                {skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            )}

            <div style={{ marginTop: '18px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {isOwnProfile ? (
                <>
                  <button className="btn btn-primary" onClick={() => navigate('/edit-profile')}>
                    My Profile · Edit
                  </button>
                  <button className="btn btn-secondary" onClick={() => navigate('/projects')}>
                    My Projects
                  </button>
                </>
              ) : (
                <button
                  className={`btn ${isFollowing ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={handleFollow}
                  disabled={followLoading}
                >
                  {followLoading ? '...' : isFollowing ? 'Following ✓' : 'Follow +'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
          Posts ({posts.length})
        </button>
        <button className={`tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
          Projects ({projects.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'posts' && (
        posts.length === 0 ? (
          <EmptyState icon="📝" title="No posts yet" description={isOwnProfile ? 'Share your first post from the feed!' : 'This developer hasn\'t posted yet.'} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onPostUpdated={handlePostUpdated}
                onPostDeleted={handlePostDeleted}
              />
            ))}
          </div>
        )
      )}

      {activeTab === 'projects' && (
        projects.length === 0 ? (
          <EmptyState icon="💼" title="No projects yet" description={isOwnProfile ? 'Add your first project!' : 'This developer hasn\'t shared any projects.'} />
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} isOwner={isOwnProfile} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
