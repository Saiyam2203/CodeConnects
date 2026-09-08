import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/dataService';
import ErrorMessage from '../components/ErrorMessage';

export default function EditProfilePage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    profile_image: user?.profile_image || '',
    skills: user?.skills || '',
    github_url: user?.github_url || '',
    linkedin_url: user?.linkedin_url || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Name is required.');
      return;
    }

    setLoading(true);
    try {
      const res = await userService.updateUser(user.id, form);
      updateUser(res.data.user);
      setSuccess('Profile updated successfully!');
      setTimeout(() => navigate(`/profile/${user.id}`), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '600px' }}>
      <div className="page-header">
        <h1 className="page-title">Edit Profile</h1>
      </div>

      <div className="card">
        {error && <ErrorMessage message={error} />}
        {success && <div className="success-message" style={{ marginBottom: '16px' }}><span>✅</span><span>{success}</span></div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="edit-name">Full Name *</label>
            <input id="edit-name" className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="edit-bio">Bio</label>
            <textarea id="edit-bio" className="form-input form-textarea" name="bio" value={form.bio} onChange={handleChange} placeholder="Tell us about yourself..." />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="edit-image">Profile Image URL</label>
            <input id="edit-image" className="form-input" name="profile_image" value={form.profile_image} onChange={handleChange} placeholder="https://example.com/avatar.jpg" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="edit-skills">Skills (comma-separated)</label>
            <input id="edit-skills" className="form-input" name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js, MySQL, Python" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="edit-github">GitHub URL</label>
            <input id="edit-github" className="form-input" name="github_url" value={form.github_url} onChange={handleChange} placeholder="https://github.com/username" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="edit-linkedin">LinkedIn URL</label>
            <input id="edit-linkedin" className="form-input" name="linkedin_url" value={form.linkedin_url} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
