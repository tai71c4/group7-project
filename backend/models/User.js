// models/User.js
const mongoose = require('mongoose');
const validator = require('validator'); 
const bcrypt = require('bcryptjs'); 

const userSchema = new mongoose.Schema({
    name: { // <-- Dùng 'name'
        type: String,
        required: [true, 'Vui lòng nhập tên của bạn'],
    },
    email: { // <-- 'email' là unique
        type: String,
        required: [true, 'Vui lòng nhập email'],
        unique: true, // Email không được trùng
        lowercase: true,
        validate: [validator.isEmail, 'Vui lòng nhập email hợp lệ']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Vui lòng nhập mật khẩu'],
        minlength: 6,
        select: false 
    },
    avatar: { 
        type: String,
        default: 'https://i.imgur.com/6VBx3io.png'
    }
}, { timestamps: true });

// Middleware mã hóa password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Hàm kiểm tra password
userSchema.methods.correctPassword = async function(
    candidatePassword, 
    userPassword 
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;