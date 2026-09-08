import { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';

export default function ProjectForm({ project, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    technologies: '',
    github_url: '',
    live_url: '',
    image_url: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || '',
        description: project.description || '',
        technologies: project.technologies || '',
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        image_url: project.image_url || ''
      });
    }
  }, [project]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Project title is required.');
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}

      <div className="form-group">
        <label className="form-label">Project Title *</label>
        <input
          className="form-input"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="My Awesome Project"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-input form-textarea"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="What does your project do?"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Technologies (comma-separated)</label>
        <input
          className="form-input"
          name="technologies"
          value={form.technologies}
          onChange={handleChange}
          placeholder="React, Node.js, MySQL"
        />
      </div>

      <div className="form-group">
        <label className="form-label">GitHub URL</label>
        <input
          className="form-input"
          name="github_url"
          value={form.github_url}
          onChange={handleChange}
          placeholder="https://github.com/user/project"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Live Demo URL</label>
        <input
          className="form-input"
          name="live_url"
          value={form.live_url}
          onChange={handleChange}
          placeholder="https://my-project.com"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Image URL</label>
        <input
          className="form-input"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="https://example.com/image.png"
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : project ? 'Update Project' : 'Add Project'}
        </button>
      </div>
    </form>
  );
}
