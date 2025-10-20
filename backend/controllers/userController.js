// Import User model đã tạo ở bước trước
const User = require('../models/userModel');

// GET /users - Lấy tất cả users từ MongoDB
const getAllUsers = async (req, res) => {
    try {
        // Dùng User.find({}) để tìm tất cả documents trong collection 'users'
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /users - Tạo user mới và lưu vào MongoDB
const createUser = async (req, res) => {
    try {
        // Lưu ý: Model của bạn dùng 'username', Postman cũng phải gửi 'username'
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'Username, email và password là bắt buộc!' });
        }

        // Tạo một document mới dựa trên User model
        const newUser = new User({ username, email, password });

        // Lưu document mới vào database
        const savedUser = await newUser.save();

        res.status(201).json({ success: true, data: savedUser });
    } catch (error) {
        // Xử lý lỗi đặc biệt khi username hoặc email bị trùng
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Username hoặc Email đã tồn tại.' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT /users/:id - Cập nhật user trong MongoDB
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm user bằng ID và cập nhật với dữ liệu mới từ req.body
        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true } // Tùy chọn: trả về document sau khi update và chạy validation
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /users/:id - Xóa user khỏi MongoDB
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm user bằng ID và xóa
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };