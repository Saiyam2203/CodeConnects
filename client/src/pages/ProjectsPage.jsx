import { useState, useEffect } from 'react';
import { projectService } from '../services/dataService';
import { useAuth } from '../hooks/useAuth';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await projectService.getProjects();
      setProjects(res.data.projects);
    } catch (err) {
      console.error('Load projects error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    setFormLoading(true);
    try {
      const res = await projectService.createProject(data);
      setProjects(prev => [res.data.project, ...prev]);
      setShowForm(false);
    } catch (err) {
      console.error('Create project error:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    setFormLoading(true);
    try {
      const res = await projectService.updateProject(editingProject.id, data);
      setProjects(prev => prev.map(p => p.id === editingProject.id ? res.data.project : p));
      setEditingProject(null);
    } catch (err) {
      console.error('Update project error:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectService.deleteProject(projectId);
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (err) {
      console.error('Delete project error:', err);
    }
  };

  const filteredProjects = activeTab === 'mine'
    ? projects.filter(p => p.user_id === user?.id)
    : projects;

  if (loading) return <LoadingSpinner text="Loading projects..." />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Projects</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add Project
        </button>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
          All Projects
        </button>
        <button className={`tab ${activeTab === 'mine' ? 'active' : ''}`} onClick={() => setActiveTab('mine')}>
          My Projects
        </button>
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState
          icon="💼"
          title={activeTab === 'mine' ? 'No projects yet' : 'No projects found'}
          description={activeTab === 'mine' ? 'Share your first project with the community!' : 'Be the first to share a project!'}
        />
      ) : (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              isOwner={project.user_id === user?.id}
              onEdit={(p) => setEditingProject(p)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add Project Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add New Project"
      >
        <ProjectForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          loading={formLoading}
        />
      </Modal>

      {/* Edit Project Modal */}
      <Modal
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        title="Edit Project"
      >
        <ProjectForm
          project={editingProject}
          onSubmit={handleUpdate}
          onCancel={() => setEditingProject(null)}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
}
