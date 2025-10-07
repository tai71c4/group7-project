// Mảng tạm lưu users (thêm mẫu nếu chưa có)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];
let nextId = 3;  // ID tiếp theo cho POST

// GET /users - Lấy tất cả users (giữ nguyên)
const getAllUsers = (req, res) => {
    res.status(200).json({ success: true, data: users });
};

// POST /users - Tạo user mới (giữ nguyên)
const createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name và email là bắt buộc!' });
    }
    const newUser = { id: nextId++, name, email };
    users.push(newUser);
    res.status(201).json({ success: true, data: newUser });
};

// PUT /users/:id - Cập nhật user
const updateUser = (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id == id);  // Tìm index theo ID
    if (index !== -1) {
        users[index] = { ...users[index], ...req.body };  // Merge dữ liệu cũ + mới
        res.status(200).json({ success: true, data: users[index] });
    } else {
        res.status(404).json({ success: false, message: "User not found" });
    }
};

// DELETE /users/:id - Xóa user
const deleteUser = (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id == id);
    if (index !== -1) {
        users.splice(index, 1);  // Xóa khỏi mảng
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } else {
        res.status(404).json({ success: false, message: "User not found" });
    }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };