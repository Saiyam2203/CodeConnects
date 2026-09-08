const { pool } = require('../config/db');

/**
 * Follow a user
 * POST /api/users/:id/connect
 * Demonstrates: Many-to-Many self-referencing relationship
 */
const followUser = async (req, res) => {
  try {
    const followingId = parseInt(req.params.id);
    const followerId = req.user.id;

    // Can't follow yourself
    if (followerId === followingId) {
      return res.status(400).json({ message: 'You cannot follow yourself.' });
    }

    // Check if user to follow exists
    const [users] = await pool.query('SELECT id FROM users WHERE id = ?', [followingId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if already following
    const [existing] = await pool.query(
      'SELECT id FROM connections WHERE follower_id = ? AND following_id = ?',
      [followerId, followingId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'You are already following this user.' });
    }

    await pool.query(
      'INSERT INTO connections (follower_id, following_id) VALUES (?, ?)',
      [followerId, followingId]
    );

    res.status(201).json({ message: 'Successfully followed user.' });
  } catch (error) {
    console.error('FollowUser error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Unfollow a user
 * DELETE /api/users/:id/connect
 */
const unfollowUser = async (req, res) => {
  try {
    const followingId = parseInt(req.params.id);
    const followerId = req.user.id;

    const [result] = await pool.query(
      'DELETE FROM connections WHERE follower_id = ? AND following_id = ?',
      [followerId, followingId]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'You are not following this user.' });
    }

    res.json({ message: 'Successfully unfollowed user.' });
  } catch (error) {
    console.error('UnfollowUser error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Get user connections (followers + following)
 * GET /api/users/:id/connections
 * Demonstrates: JOIN on self-referencing Many-to-Many table
 */
const getConnections = async (req, res) => {
  try {
    const userId = req.params.id;

    // Get followers — users who follow this user
    const [followers] = await pool.query(
      `SELECT u.id, u.name, u.email, u.bio, u.profile_image, u.skills
       FROM connections c
       JOIN users u ON c.follower_id = u.id
       WHERE c.following_id = ?
       ORDER BY c.created_at DESC`,
      [userId]
    );

    // Get following — users this user follows
    const [following] = await pool.query(
      `SELECT u.id, u.name, u.email, u.bio, u.profile_image, u.skills
       FROM connections c
       JOIN users u ON c.following_id = u.id
       WHERE c.follower_id = ?
       ORDER BY c.created_at DESC`,
      [userId]
    );

    res.json({ followers, following });
  } catch (error) {
    console.error('GetConnections error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { followUser, unfollowUser, getConnections };
