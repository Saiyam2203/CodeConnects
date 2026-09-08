import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Avatar from './Avatar';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <>
      <nav className="navbar" id="main-navbar">
        <Link to="/feed" className="navbar-brand">
          <div className="brand-icon">⚡</div>
          CodeConnects
        </Link>

        <div className="navbar-nav">
          <Link to="/feed" className={`nav-link ${isActive('/feed')}`}>
            🏠 Feed
          </Link>
          <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>
            💼 Projects
          </Link>
          <Link to="/search" className={`nav-link ${isActive('/search')}`}>
            🔍 Search
          </Link>
          <Link to="/connections" className={`nav-link ${isActive('/connections')}`}>
            👥 Connections
          </Link>
        </div>

        <div className="navbar-actions">
          <Link to={`/profile/${user?.id}`} className="nav-link" style={{ padding: '4px 8px' }}>
            <Avatar src={user?.profile_image} name={user?.name} size="sm" />
          </Link>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile bottom navigation */}
      <div className="mobile-nav">
        <div className="mobile-nav-items">
          <Link to="/feed" className={`mobile-nav-link ${isActive('/feed')}`}>
            <span className="nav-icon">🏠</span>
            Feed
          </Link>
          <Link to="/projects" className={`mobile-nav-link ${isActive('/projects')}`}>
            <span className="nav-icon">💼</span>
            Projects
          </Link>
          <Link to="/search" className={`mobile-nav-link ${isActive('/search')}`}>
            <span className="nav-icon">🔍</span>
            Search
          </Link>
          <Link to="/connections" className={`mobile-nav-link ${isActive('/connections')}`}>
            <span className="nav-icon">👥</span>
            Network
          </Link>
          <Link to={`/profile/${user?.id}`} className={`mobile-nav-link ${location.pathname.includes('/profile') ? 'active' : ''}`}>
            <span className="nav-icon">👤</span>
            Profile
          </Link>
        </div>
      </div>
    </>
  );
}
