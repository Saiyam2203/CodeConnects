import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="navbar-brand">
          <div className="brand-icon">⚡</div>
          CodeConnects
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to="/login" className="btn btn-ghost">Log In</Link>
          <Link to="/register" className="btn btn-primary">Sign Up</Link>
        </div>
      </nav>

      <section className="landing-hero">
        <h1 className="landing-title">
          Where Developers<br />
          <span className="gradient-text">Connect & Grow</span>
        </h1>
        <p className="landing-subtitle">
          Join a thriving community of developers. Share your projects, exchange ideas,
          and build meaningful connections with fellow engineers.
        </p>
        <div className="landing-cta">
          <Link to="/register" className="btn btn-primary btn-lg">Get Started — It's Free</Link>
          <Link to="/login" className="btn btn-secondary btn-lg">Log In</Link>
        </div>
      </section>

      <section className="landing-features" id="features">
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3 className="feature-title">Developer Network</h3>
          <p className="feature-description">
            Connect with developers who share your interests. Follow, collaborate, and grow your professional network.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💼</div>
          <h3 className="feature-title">Project Showcase</h3>
          <p className="feature-description">
            Share your projects with GitHub links, live demos, and tech stacks. Get visibility for your work.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💬</div>
          <h3 className="feature-title">Community Feed</h3>
          <p className="feature-description">
            Share updates, tips, and ideas. Like and comment on posts. Stay connected with the dev community.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3 className="feature-title">Skill Profiles</h3>
          <p className="feature-description">
            Showcase your tech stack, experience, and portfolio. Let others discover what you're great at.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3 className="feature-title">Find Developers</h3>
          <p className="feature-description">
            Search for developers by name or skills. Discover talented engineers and potential collaborators.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3 className="feature-title">Secure Platform</h3>
          <p className="feature-description">
            Built with JWT authentication, encrypted passwords, and secure API design for your peace of mind.
          </p>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)' }}>
        <p>© 2024 CodeConnects. Built with React, Node.js, Express & MySQL.</p>
      </footer>
    </div>
  );
}
