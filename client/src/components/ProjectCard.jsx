import { parseSkills, truncateText } from '../utils/helpers';

export default function ProjectCard({ project, isOwner, onEdit, onDelete }) {
  const technologies = parseSkills(project.technologies);

  return (
    <div className="project-card" id={`project-${project.id}`}>
      {project.image_url && (
        <img
          className="project-image"
          src={project.image_url}
          alt={project.title}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        {project.description && (
          <p className="project-description">{truncateText(project.description, 200)}</p>
        )}
        {technologies.length > 0 && (
          <div className="project-tech">
            {technologies.map((tech, i) => (
              <span key={i} className="project-tech-tag">{tech}</span>
            ))}
          </div>
        )}
        <div className="project-links">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              🔗 GitHub
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              🌐 Live Demo
            </a>
          )}
          {isOwner && (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => onEdit?.(project)}>✏️ Edit</button>
              <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }} onClick={() => onDelete?.(project.id)}>🗑️</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
