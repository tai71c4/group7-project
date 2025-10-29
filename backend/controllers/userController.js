// Bước 2: Tạo mảng tạm users
// (Trong thực tế, cái này sẽ được thay bằng MongoDB)
let users = [
    { id: 1, name: "Student 1 (Bạn)", email: "student1@example.com" },
    { id: 2, name: "Student 2 (Frontend)", email: "student2@example.com" },
    { id: 3, name: "Student 3 (Database)", email: "student3@example.com" }
];
let nextId = 4; // Biến để tạo ID tự động cho user mới

// Bước 3: Viết API

// GET /users: Lấy danh sách tất cả người dùng
exports.getUsers = (req, res) => {
    res.status(200).json(users);
};

// POST /users: Tạo một người dùng mới
exports.createUser = (req, res) => {
    // Lấy name và email từ body của request
    const { name, email } = req.body;

    // Kiểm tra đơn giản
    if (!name || !email) {
        return res.status(400).json({ message: "Vui lòng cung cấp đủ tên và email." });
    }

    // Tạo user mới
    const newUser = {
        id: nextId++,
        name: name,
        email: email
    };

    // Thêm user mới vào mảng
    users.push(newUser);

    // Trả về thông báo thành công và user vừa tạo
    res.status(201).json(newUser);
};