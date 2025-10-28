const mongoose = require('mongoose');

// 1. Định nghĩa "Schema" (khuôn mẫu) cho User
// Đây là cấu trúc dữ liệu của bạn trong MongoDB
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Yêu cầu bắt buộc phải có tên
    },
    email: {
        type: String,
        required: true, // Yêu cầu bắt buộc phải có email
        unique: true // Đảm bảo email này là duy nhất trong database
    }
}, {
    // Tùy chọn này sẽ tự động thêm 2 trường: 
    // createdAt (thời gian tạo) và updatedAt (thời gian cập nhật)
    timestamps: true 
});

// 2. Tạo Model từ Schema
// Mongoose sẽ tự động tạo một collection (bảng) tên là "users" (tự động thêm 's')
const User = mongoose.model('User', userSchema);

// 3. Xuất (export) Model này ra
// Giúp các file khác (như userController.js) có thể import và sử dụng
module.exports = User;