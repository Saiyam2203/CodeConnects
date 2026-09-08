const express = require('express');
const router = express.Router();
const { getProjects, getProjectsByUser, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const auth = require('../middleware/auth');

// All project routes are protected
router.get('/', auth, getProjects);
router.get('/user/:userId', auth, getProjectsByUser);
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
