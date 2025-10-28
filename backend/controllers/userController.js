const User = require('../models/User'); // <-- Import User Model

// GET /users: Lấy tất cả user (Dùng Mongoose)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

// POST /users: Tạo user mới (Dùng Mongoose)
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Vui lòng cung cấp đủ tên và email." });
        }
        
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "Email này đã được sử dụng." });
        }

        const newUser = new User({
            name: name,
            email: email
        });

        const savedUser = await newUser.save(); // Lưu vào MongoDB
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

// --- BẮT ĐẦU HOẠT ĐỘNG 7 ---

// PUT /users/:id : Cập nhật (Sửa) user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        const { name, email } = req.body; // Lấy thông tin mới

        // Tìm và cập nhật user trong MongoDB
        // { new: true } để kết quả trả về là user *sau khi* đã cập nhật
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email },
            { new: true, runValidators: true } // runValidators để kiểm tra email mới có hợp lệ không
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Không tìm thấy user" });
        }

        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

// DELETE /users/:id : Xóa user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Không tìm thấy user" });
        }

        res.status(200).json({ message: "Đã xóa user thành công" });

    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};