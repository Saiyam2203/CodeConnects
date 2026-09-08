const { pool } = require('../config/db');

/**
 * Get comments for a post
 * GET /api/posts/:id/comments
 * Demonstrates: JOIN to get comment author info
 */
const getComments = async (req, res) => {
  try {
    const postId = req.params.id;

    const [comments] = await pool.query(
      `SELECT c.id, c.content, c.created_at,
        c.user_id,
        u.name AS user_name,
        u.profile_image AS user_profile_image
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ?
       ORDER BY c.created_at ASC`,
      [postId]
    );

    res.json({ comments });
  } catch (error) {
    console.error('GetComments error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Add a comment to a post
 * POST /api/posts/:id/comments
 */
const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Comment content is required.' });
    }

    // Check if post exists
    const [posts] = await pool.query('SELECT id FROM posts WHERE id = ?', [postId]);
    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    const [result] = await pool.query(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [postId, userId, content.trim()]
    );

    // Fetch the created comment with user info
    const [comments] = await pool.query(
      `SELECT c.id, c.content, c.created_at,
        c.user_id,
        u.name AS user_name,
        u.profile_image AS user_profile_image
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.id = ?`,
      [result.insertId]
    );

    res.status(201).json({ message: 'Comment added.', comment: comments[0] });
  } catch (error) {
    console.error('CreateComment error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Delete a comment
 * DELETE /api/comments/:id
 */
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check ownership
    const [existing] = await pool.query('SELECT user_id FROM comments WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Comment not found.' });
    }
    if (existing[0].user_id !== userId) {
      return res.status(403).json({ message: 'You can only delete your own comments.' });
    }

    await pool.query('DELETE FROM comments WHERE id = ?', [id]);

    res.json({ message: 'Comment deleted.' });
  } catch (error) {
    console.error('DeleteComment error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getComments, createComment, deleteComment };
