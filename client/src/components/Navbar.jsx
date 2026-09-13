import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import Avatar from './Avatar';

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9 21v-6h6v6" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function NavIcons({ page }) {
  if (page === 'projects') return <BriefcaseIcon />;
  if (page === 'search') return <SearchIcon />;
  if (page === 'connections') return <UsersIcon />;
  return <HomeIcon />;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(search.trim() ? `/search?q=${encodeURIComponent(search.trim())}` : '/search');
  };

  const links = [
    { to: '/feed', label: 'Home', page: 'feed' },
    { to: '/projects', label: 'Projects', page: 'projects' },
    { to: '/search', label: 'Search', page: 'search' },
    { to: '/connections', label: 'Network', page: 'connections' },
  ];

  return (
    <>
      <nav className="navbar" id="main-navbar">
        <div className="navbar-inner">
          <Link to="/feed" className="navbar-brand">
            <div className="brand-icon">&lt;/&gt;</div>
            CodeConnect
          </Link>

          <form className="navbar-search search-container" onSubmit={submitSearch}>
            <span className="search-icon"><SearchIcon /></span>
            <input
              className="search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search developers, skills..."
              aria-label="Search"
            />
          </form>

          <div className="navbar-nav">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={`nav-link ${isActive(l.to)}`}>
                <NavIcons page={l.page} />
                {l.label}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <Link to={`/profile/${user?.id}`} className="profile-chip" title="My profile">
              <Avatar src={user?.profile_image} name={user?.name} size="sm" />
              <span className="profile-chip-name">{user?.name?.split(' ')[0] || 'Profile'}</span>
            </Link>
            <button className="switch-link" onClick={handleLogout} title="Log out">
              Switch
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile bottom navigation */}
      <div className="mobile-nav">
        <div className="mobile-nav-items">
          <Link to="/feed" className={`mobile-nav-link ${isActive('/feed')}`}>
            <span className="nav-icon"><HomeIcon /></span>
            Home
          </Link>
          <Link to="/projects" className={`mobile-nav-link ${isActive('/projects')}`}>
            <span className="nav-icon"><BriefcaseIcon /></span>
            Projects
          </Link>
          <Link to="/search" className={`mobile-nav-link ${isActive('/search')}`}>
            <span className="nav-icon"><SearchIcon /></span>
            Search
          </Link>
          <Link to="/connections" className={`mobile-nav-link ${isActive('/connections')}`}>
            <span className="nav-icon"><UsersIcon /></span>
            Network
          </Link>
          <Link to={`/profile/${user?.id}`} className={`mobile-nav-link ${location.pathname.includes('/profile') ? 'active' : ''}`}>
            <span className="nav-icon"><Avatar src={user?.profile_image} name={user?.name} size="sm" /></span>
            Profile
          </Link>
        </div>
      </div>
    </>
  );
}
