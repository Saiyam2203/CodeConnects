const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUser, searchUsers } = require('../controllers/userController');
const { followUser, unfollowUser, getConnections } = require('../controllers/connectionController');
const auth = require('../middleware/auth');

// All user routes are protected
router.get('/search', auth, searchUsers);
router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);

// Connection routes nested under users
router.post('/:id/connect', auth, followUser);
router.delete('/:id/connect', auth, unfollowUser);
router.get('/:id/connections', auth, getConnections);

module.exports = router;
