const { pool } = require('../config/db');

/**
 * Get all projects
 * GET /api/projects
 */
const getProjects = async (req, res) => {
  try {
    const [projects] = await pool.query(
      `SELECT p.*, u.name AS user_name, u.profile_image AS user_profile_image
       FROM projects p
       JOIN users u ON p.user_id = u.id
       ORDER BY p.created_at DESC`
    );

    res.json({ projects });
  } catch (error) {
    console.error('GetProjects error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Get projects by user ID
 * GET /api/projects/user/:userId
 * Demonstrates: One-to-Many relationship query
 */
const getProjectsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const [projects] = await pool.query(
      `SELECT p.*, u.name AS user_name, u.profile_image AS user_profile_image
       FROM projects p
       JOIN users u ON p.user_id = u.id
       WHERE p.user_id = ?
       ORDER BY p.created_at DESC`,
      [userId]
    );

    res.json({ projects });
  } catch (error) {
    console.error('GetProjectsByUser error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Create a project
 * POST /api/projects
 */
const createProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, technologies, github_url, live_url, image_url } = req.body;

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: 'Project title is required.' });
    }

    const [result] = await pool.query(
      `INSERT INTO projects (user_id, title, description, technologies, github_url, live_url, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, title.trim(), description || null, technologies || null, github_url || null, live_url || null, image_url || null]
    );

    const [projects] = await pool.query(
      `SELECT p.*, u.name AS user_name, u.profile_image AS user_profile_image
       FROM projects p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = ?`,
      [result.insertId]
    );

    res.status(201).json({ message: 'Project created.', project: projects[0] });
  } catch (error) {
    console.error('CreateProject error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Update a project
 * PUT /api/projects/:id
 */
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, technologies, github_url, live_url, image_url } = req.body;

    // Check ownership
    const [existing] = await pool.query('SELECT user_id FROM projects WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    if (existing[0].user_id !== userId) {
      return res.status(403).json({ message: 'You can only edit your own projects.' });
    }

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: 'Project title is required.' });
    }

    await pool.query(
      `UPDATE projects SET title = ?, description = ?, technologies = ?, github_url = ?, live_url = ?, image_url = ?
       WHERE id = ?`,
      [title.trim(), description || null, technologies || null, github_url || null, live_url || null, image_url || null, id]
    );

    const [projects] = await pool.query(
      `SELECT p.*, u.name AS user_name, u.profile_image AS user_profile_image
       FROM projects p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = ?`,
      [id]
    );

    res.json({ message: 'Project updated.', project: projects[0] });
  } catch (error) {
    console.error('UpdateProject error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Delete a project
 * DELETE /api/projects/:id
 */
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check ownership
    const [existing] = await pool.query('SELECT user_id FROM projects WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    if (existing[0].user_id !== userId) {
      return res.status(403).json({ message: 'You can only delete your own projects.' });
    }

    await pool.query('DELETE FROM projects WHERE id = ?', [id]);

    res.json({ message: 'Project deleted.' });
  } catch (error) {
    console.error('DeleteProject error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getProjects, getProjectsByUser, createProject, updateProject, deleteProject };
