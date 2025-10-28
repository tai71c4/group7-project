// ✅ Code ĐÚNG cho file: routes/user.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// API đã làm ở Hoạt động 3
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

// API mới cho Hoạt động 7
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;