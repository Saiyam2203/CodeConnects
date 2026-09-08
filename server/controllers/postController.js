const { pool } = require('../config/db');

/**
 * Get all posts (feed) with user info, like count, comment count
 * GET /api/posts
 * Demonstrates: JOIN query, aggregate subqueries
 */
const getPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    // JOIN posts with users; subqueries for like/comment counts and user's like status
    const [posts] = await pool.query(
      `SELECT p.id, p.content, p.created_at, p.updated_at,
        p.user_id,
        u.name AS user_name,
        u.profile_image AS user_profile_image,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likes_count,
        (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comments_count,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id AND user_id = ?) AS is_liked
       FROM posts p
       JOIN users u ON p.user_id = u.id
       ORDER BY p.created_at DESC`,
      [userId]
    );

    // Convert is_liked from count to boolean
    const formattedPosts = posts.map(post => ({
      ...post,
      is_liked: post.is_liked > 0
    }));

    res.json({ posts: formattedPosts });
  } catch (error) {
    console.error('GetPosts error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Get posts by a specific user
 * GET /api/posts/user/:userId
 */
const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    const [posts] = await pool.query(
      `SELECT p.id, p.content, p.created_at, p.updated_at,
        p.user_id,
        u.name AS user_name,
        u.profile_image AS user_profile_image,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likes_count,
        (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comments_count,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id AND user_id = ?) AS is_liked
       FROM posts p
       JOIN users u ON p.user_id = u.id
       WHERE p.user_id = ?
       ORDER BY p.created_at DESC`,
      [currentUserId, userId]
    );

    const formattedPosts = posts.map(post => ({
      ...post,
      is_liked: post.is_liked > 0
    }));

    res.json({ posts: formattedPosts });
  } catch (error) {
    console.error('GetPostsByUser error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Create a new post
 * POST /api/posts
 */
const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Post content is required.' });
    }

    const [result] = await pool.query(
      'INSERT INTO posts (user_id, content) VALUES (?, ?)',
      [userId, content.trim()]
    );

    // Fetch the created post with user info
    const [posts] = await pool.query(
      `SELECT p.id, p.content, p.created_at, p.updated_at,
        p.user_id,
        u.name AS user_name,
        u.profile_image AS user_profile_image,
        0 AS likes_count,
        0 AS comments_count,
        false AS is_liked
       FROM posts p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = ?`,
      [result.insertId]
    );

    res.status(201).json({ message: 'Post created.', post: posts[0] });
  } catch (error) {
    console.error('CreatePost error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Update a post
 * PUT /api/posts/:id
 */
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Post content is required.' });
    }

    // Check ownership
    const [existing] = await pool.query('SELECT user_id FROM posts WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    if (existing[0].user_id !== userId) {
      return res.status(403).json({ message: 'You can only edit your own posts.' });
    }

    await pool.query('UPDATE posts SET content = ? WHERE id = ?', [content.trim(), id]);

    const [posts] = await pool.query(
      `SELECT p.id, p.content, p.created_at, p.updated_at,
        p.user_id,
        u.name AS user_name,
        u.profile_image AS user_profile_image,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likes_count,
        (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comments_count,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id AND user_id = ?) AS is_liked
       FROM posts p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = ?`,
      [userId, id]
    );

    res.json({ message: 'Post updated.', post: { ...posts[0], is_liked: posts[0].is_liked > 0 } });
  } catch (error) {
    console.error('UpdatePost error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Delete a post
 * DELETE /api/posts/:id
 */
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check ownership
    const [existing] = await pool.query('SELECT user_id FROM posts WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    if (existing[0].user_id !== userId) {
      return res.status(403).json({ message: 'You can only delete your own posts.' });
    }

    // CASCADE will delete related likes and comments
    await pool.query('DELETE FROM posts WHERE id = ?', [id]);

    res.json({ message: 'Post deleted.' });
  } catch (error) {
    console.error('DeletePost error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getPosts, getPostsByUser, createPost, updatePost, deletePost };
