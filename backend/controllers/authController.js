// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Hàm tạo Token
const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// Hàm tạo và gửi Token cho client
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // Xóa mật khẩu khỏi output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token, // Gửi token cho client
        data: {
            user: user
        }
    });
};

// API: Đăng ký
exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            // (role sẽ tự động là 'user' như trong model)
        });

        // Đăng ký xong thì đăng nhập luôn
        createSendToken(newUser, 201, res);

    } catch (err) {
        // Lỗi (ví dụ: trùng email) sẽ bị bắt ở đây
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// API: Đăng nhập
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1) Kiểm tra email & password có tồn tại
        if (!email || !password) {
            return res.status(400).json({ status: 'fail', message: 'Vui lòng nhập email và password' });
        }

        // 2) Tìm user & LẤY CẢ PASSWORD (vì model đã ẩn đi)
        const user = await User.findOne({ email: email }).select('+password');

        // 3) Kiểm tra user có tồn tại VÀ password có đúng không
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ status: 'fail', message: 'Email hoặc mật khẩu không đúng' });
        }

        // 4) Gửi token
        createSendToken(user, 200, res);

    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// API: Đăng xuất (Client tự xóa token là chính)
exports.logout = (req, res) => {
    res.status(200).json({ status: 'success', message: 'Đăng xuất thành công' });
};