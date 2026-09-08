const { pool } = require('../config/db');

/**
 * Like a post
 * POST /api/posts/:id/like
 * Uses UNIQUE constraint to prevent duplicate likes
 */
const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // Check if post exists
    const [posts] = await pool.query('SELECT id FROM posts WHERE id = ?', [postId]);
    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Check if already liked
    const [existing] = await pool.query(
      'SELECT id FROM likes WHERE post_id = ? AND user_id = ?',
      [postId, userId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'You have already liked this post.' });
    }

    await pool.query(
      'INSERT INTO likes (post_id, user_id) VALUES (?, ?)',
      [postId, userId]
    );

    // Return updated like count
    const [countResult] = await pool.query(
      'SELECT COUNT(*) AS likes_count FROM likes WHERE post_id = ?',
      [postId]
    );

    res.status(201).json({
      message: 'Post liked.',
      likes_count: countResult[0].likes_count
    });
  } catch (error) {
    console.error('LikePost error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Unlike a post
 * DELETE /api/posts/:id/like
 */
const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const [result] = await pool.query(
      'DELETE FROM likes WHERE post_id = ? AND user_id = ?',
      [postId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'You have not liked this post.' });
    }

    // Return updated like count
    const [countResult] = await pool.query(
      'SELECT COUNT(*) AS likes_count FROM likes WHERE post_id = ?',
      [postId]
    );

    res.json({
      message: 'Post unliked.',
      likes_count: countResult[0].likes_count
    });
  } catch (error) {
    console.error('UnlikePost error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { likePost, unlikePost };
