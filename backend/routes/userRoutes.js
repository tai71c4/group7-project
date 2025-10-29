// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Tất cả các route bên dưới dòng này đều BẮT BUỘC phải đăng nhập (có Token)
router.use(authMiddleware.protect);

// ---- Hoạt động 2: Profile (User thường) ----
router.get('/profile', userController.getProfile); // <-- API BẠN ĐANG LỖI 404
router.put('/profile', userController.updateProfile);

// ---- Hoạt động 3: Tự xóa (User thường) ----
router.delete('/profile', userController.deleteProfile);

// ---- Hoạt động 3: Chỉ Admin ----
// Các route bên dưới dòng này BẮT BUỘC phải là Admin
router.use(authMiddleware.restrictTo('admin'));

router.get('/', userController.getAllUsers); // GET /api/users
router.delete('/:id', userController.deleteUser); // DELETE /api/users/:id

module.exports = router;