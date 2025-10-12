const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /users - Lấy tất cả users (giữ nguyên từ trước)
router.get('/', userController.getAllUsers);  // Hoặc getUsers nếu bạn đặt tên khác

// POST /users - Tạo user mới (giữ nguyên)
router.post('/', userController.createUser);

// PUT /users/:id - Cập nhật user
router.put('/:id', userController.updateUser);

// DELETE /users/:id - Xóa user
router.delete('/:id', userController.deleteUser);

module.exports = router;