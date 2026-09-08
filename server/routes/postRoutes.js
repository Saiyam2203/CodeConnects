const express = require('express');
const router = express.Router();
const { getPosts, getPostsByUser, createPost, updatePost, deletePost } = require('../controllers/postController');
const { likePost, unlikePost } = require('../controllers/likeController');
const { getComments, createComment, deleteComment } = require('../controllers/commentController');
const auth = require('../middleware/auth');

// All post routes are protected
router.get('/', auth, getPosts);
router.get('/user/:userId', auth, getPostsByUser);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

// Like routes nested under posts
router.post('/:id/like', auth, likePost);
router.delete('/:id/like', auth, unlikePost);

// Comment routes nested under posts
router.get('/:id/comments', auth, getComments);
router.post('/:id/comments', auth, createComment);

module.exports = router;
