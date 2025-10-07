// Mảng tạm lưu users (in-memory, mất khi restart server)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },  // User mẫu để test
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];
let nextId = 3;  // ID tiếp theo

// GET /users - Trả về tất cả users
const getAllUsers = (req, res) => {
    res.status(200).json({ success: true, data: users });
};

// POST /users - Tạo user mới
const createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name và email là bắt buộc!' });
    }
    const newUser = { id: nextId++, name, email };
    users.push(newUser);
    res.status(201).json({ success: true, data: newUser });
};

module.exports = { getAllUsers, createUser };