const express = require('express');
const router = express.Router();
const { deleteComment } = require('../controllers/commentController');
const auth = require('../middleware/auth');

// Standalone comment route for deletion
router.delete('/:id', auth, deleteComment);

module.exports = router;
