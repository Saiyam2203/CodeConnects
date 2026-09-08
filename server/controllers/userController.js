const { pool } = require('../config/db');

/**
 * Get all users (excluding passwords)
 * GET /api/users
 */
const getUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT u.id, u.name, u.email, u.bio, u.profile_image, u.skills, u.github_url, u.linkedin_url, u.created_at,
        (SELECT COUNT(*) FROM connections WHERE following_id = u.id) AS followers_count,
        (SELECT COUNT(*) FROM connections WHERE follower_id = u.id) AS following_count
       FROM users u
       ORDER BY u.created_at DESC`
    );

    res.json({ users });
  } catch (error) {
    console.error('GetUsers error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Get user by ID with follower/following counts
 * GET /api/users/:id
 * Uses JOIN-like subqueries for relational data
 */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const [users] = await pool.query(
      `SELECT u.id, u.name, u.email, u.bio, u.profile_image, u.skills, u.github_url, u.linkedin_url, u.created_at,
        (SELECT COUNT(*) FROM connections WHERE following_id = u.id) AS followers_count,
        (SELECT COUNT(*) FROM connections WHERE follower_id = u.id) AS following_count
       FROM users u
       WHERE u.id = ?`,
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the requesting user follows this user
    let isFollowing = false;
    if (req.user) {
      const [connections] = await pool.query(
        'SELECT id FROM connections WHERE follower_id = ? AND following_id = ?',
        [req.user.id, id]
      );
      isFollowing = connections.length > 0;
    }

    res.json({ user: { ...users[0], isFollowing } });
  } catch (error) {
    console.error('GetUserById error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Update user profile
 * PUT /api/users/:id
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Only allow users to update their own profile
    if (parseInt(id) !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own profile.' });
    }

    const { name, bio, profile_image, skills, github_url, linkedin_url } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required.' });
    }

    await pool.query(
      `UPDATE users SET name = ?, bio = ?, profile_image = ?, skills = ?, github_url = ?, linkedin_url = ?
       WHERE id = ?`,
      [name, bio || null, profile_image || null, skills || null, github_url || null, linkedin_url || null, id]
    );

    // Return updated user
    const [users] = await pool.query(
      'SELECT id, name, email, bio, profile_image, skills, github_url, linkedin_url, created_at FROM users WHERE id = ?',
      [id]
    );

    res.json({ message: 'Profile updated successfully.', user: users[0] });
  } catch (error) {
    console.error('UpdateUser error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Search users by name
 * GET /api/users/search?q=query
 * Uses LIKE with parameterized query for SQL injection prevention
 */
const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.json({ users: [] });
    }

    const [users] = await pool.query(
      `SELECT id, name, email, bio, profile_image, skills, github_url, linkedin_url, created_at
       FROM users
       WHERE name LIKE ? OR skills LIKE ?
       ORDER BY name ASC
       LIMIT 20`,
      [`%${q}%`, `%${q}%`]
    );

    res.json({ users });
  } catch (error) {
    console.error('SearchUsers error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getUsers, getUserById, updateUser, searchUsers };
