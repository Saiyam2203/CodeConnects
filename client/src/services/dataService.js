import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

export const userService = {
  getUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  searchUsers: (query) => api.get(`/users/search?q=${encodeURIComponent(query)}`),
  getConnections: (id) => api.get(`/users/${id}/connections`),
  followUser: (id) => api.post(`/users/${id}/connect`),
  unfollowUser: (id) => api.delete(`/users/${id}/connect`)
};

export const postService = {
  getPosts: () => api.get('/posts'),
  getPostsByUser: (userId) => api.get(`/posts/user/${userId}`),
  createPost: (data) => api.post('/posts', data),
  updatePost: (id, data) => api.put(`/posts/${id}`, data),
  deletePost: (id) => api.delete(`/posts/${id}`),
  likePost: (id) => api.post(`/posts/${id}/like`),
  unlikePost: (id) => api.delete(`/posts/${id}/like`),
  getComments: (postId) => api.get(`/posts/${postId}/comments`),
  createComment: (postId, data) => api.post(`/posts/${postId}/comments`, data),
  deleteComment: (commentId) => api.delete(`/comments/${commentId}`)
};

export const projectService = {
  getProjects: () => api.get('/projects'),
  getProjectsByUser: (userId) => api.get(`/projects/user/${userId}`),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`)
};
