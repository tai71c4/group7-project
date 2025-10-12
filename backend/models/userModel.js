const mongoose = require('mongoose');

// 1. Định nghĩa Schema (cấu trúc) cho User
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Vui lòng nhập username'], // Bắt buộc phải có
            unique: true, // Không được trùng
            trim: true // Xóa khoảng trắng thừa ở đầu và cuối
        },
        email: {
            type: String,
            required: [true, 'Vui lòng nhập email'],
            unique: true,
            trim: true,
            lowercase: true // Luôn chuyển thành chữ thường
        },
        password: {
            type: String,
            required: [true, 'Vui lòng nhập password']
        }
    },
    {
        // 2. Tùy chọn tự động thêm timestamps
        timestamps: true // Tự động thêm trường createdAt và updatedAt
    }
);

// 3. Tạo Model từ Schema
// Mongoose sẽ tự động tạo một collection tên là "users" (số nhiều, chữ thường) trong MongoDB
const User = mongoose.model('User', userSchema);

// 4. Export Model để các file khác có thể sử dụng
module.exports = User;