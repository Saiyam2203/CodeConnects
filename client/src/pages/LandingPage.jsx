import { Link } from 'react-router-dom';

const features = [
  { icon: '👥', title: 'Developer Network', desc: 'Follow developers who share your stack. Grow a network that actually helps you ship.' },
  { icon: '💼', title: 'Project Showcase', desc: 'Share builds with GitHub links, live demos and tech tags. Get eyes on your work.' },
  { icon: '💬', title: 'Community Feed', desc: 'Post updates, tips and ideas. Like, comment and stay in the loop.' },
  { icon: '🎯', title: 'Skill Profiles', desc: 'Showcase your bio, skills and portfolio so collaborators can find you.' },
  { icon: '🔍', title: 'Find Developers', desc: 'Search by name or skill. Discover engineers to learn from or build with.' },
  { icon: '🔒', title: 'Secure Platform', desc: 'JWT auth, hashed passwords and a clean REST API keep accounts safe.' },
];

export default function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="navbar-brand">
          <div className="brand-icon">&lt;/&gt;</div>
          CodeConnect
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to="/login" className="btn btn-ghost">Log In</Link>
          <Link to="/register" className="btn btn-primary">Sign Up</Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div>
          <div className="landing-badge"><span className="dot" /> Live community for developers</div>
          <h1 className="landing-title">
            Where Developers<br />
            <span className="gradient-text">Connect & Grow</span>
          </h1>
          <p className="landing-subtitle">
            Share posts and projects, follow developers with your stack,
            and build meaningful connections — all in one clean feed.
          </p>
          <div className="landing-cta">
            <Link to="/register" className="btn btn-primary btn-lg">Get Started — It's Free</Link>
            <Link to="/login" className="btn btn-secondary btn-lg">Log In</Link>
          </div>
          <div className="landing-proof">
            <div className="avatar-stack">
              <div className="avatar" style={{ background: 'linear-gradient(135deg,#1899f2,#6366f1)' }}>AR</div>
              <div className="avatar" style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)' }}>SC</div>
              <div className="avatar" style={{ background: 'linear-gradient(135deg,#16a34a,#0ea5e9)' }}>MJ</div>
              <div className="avatar" style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)' }}>+</div>
            </div>
            <div className="landing-proof-text">Joined by developers sharing<br />posts, projects & skills daily.</div>
          </div>
        </div>

        <div className="landing-mock" aria-hidden="true">
          <div className="landing-mock-top">
            <span className="mock-dot" style={{ background: '#f87171' }} />
            <span className="mock-dot" style={{ background: '#fbbf24' }} />
            <span className="mock-dot" style={{ background: '#34d399' }} />
            <span style={{ marginLeft: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>CodeConnect — Home</span>
          </div>
          <div className="landing-mock-body">
            <div className="mock-post">
              <div className="mock-post-row">
                <div className="mock-avatar" style={{ background: 'linear-gradient(135deg,#1899f2,#7c3aed)' }} />
                <div className="mock-lines" style={{ flex: 1 }}>
                  <span style={{ width: '45%' }} />
                  <span style={{ width: '30%', marginBottom: 0 }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-primary)' }}>Follow</span>
              </div>
              <div className="mock-lines">
                <span style={{ width: '90%' }} />
                <span style={{ width: '65%', marginBottom: '10px' }} />
              </div>
              <div className="mock-image" />
            </div>
            <div className="mock-post">
              <div className="mock-post-row">
                <div className="mock-avatar" style={{ background: 'linear-gradient(135deg,#16a34a,#0ea5e9)' }} />
                <div className="mock-lines" style={{ flex: 1 }}>
                  <span style={{ width: '50%' }} />
                  <span style={{ width: '28%', marginBottom: 0 }} />
                </div>
              </div>
              <div className="mock-lines">
                <span style={{ width: '80%' }} />
                <span style={{ width: '55%', marginBottom: 0 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features" id="features">
        {features.map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-description">{f.desc}</p>
          </div>
        ))}
      </section>

      <footer style={{ textAlign: 'center', padding: '28px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', fontSize: '13px', background: 'var(--bg-card)' }}>
        <p>© 2024 CodeConnects. Built with React, Node.js, Express & MySQL.</p>
      </footer>
    </div>
  );
}
