// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;
    // 1) Lấy token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ status: 'fail', message: 'Bạn chưa đăng nhập. Vui lòng đăng nhập.' });
    }

    try {
        // 2) Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3) Kiểm tra user còn tồn tại
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ status: 'fail', message: 'User không còn tồn tại.' });
        }

        // 4) Gắn user vào request
        req.user = currentUser;
        next();

    } catch (err) {
        res.status(401).json({ status: 'fail', message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
};

// Middleware kiểm tra quyền Admin
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                status: 'fail', 
                message: 'Bạn không có quyền thực hiện hành động này (Yêu cầu quyền Admin).' 
            });
        }
        next();
    };
};