// controllers/userController.js
const User = require('../models/User');

// ---- Hoạt động 2: Profile ----
exports.getProfile = (req, res) => {
    // Middleware 'protect' đã lấy user và gắn vào req.user
    res.status(200).json({
        status: 'success',
        data: {
            user: req.user
        }
    });
};

exports.updateProfile = async (req, res) => {
    try {
        // Chỉ cho phép cập nhật 'name' và 'avatar'
        const filterBody = {
            name: req.body.name,
            avatar: req.body.avatar 
        };

        const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// ---- Hoạt động 3: Tự xóa tài khoản ----
exports.deleteProfile = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(204).json({ // 204: No Content (Xóa thành công)
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};


// ---- Hoạt động 3: Admin ----
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: { users }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};