const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// --- BẮT ĐẦU CẬP NHẬT BUỔI 5 ---
// 1. Import 2 file route mới (thay cho file cũ)
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // (File này sẽ thay thế file 'user.js' cũ)

// 2. Sử dụng các routes với tiền tố (prefix)
// URL: /api/auth/login, /api/auth/signup
app.use('/api/auth', authRoutes);

// URL: /api/users/profile, /api/users/ (admin)
app.use('/api/users', userRoutes);
// --- KẾT THÚC CẬP NHẬT ---


const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI; 

// --- Kết nối tới MongoDB (Giữ nguyên) ---
if (!MONGO_URI) {
    console.error("Lỗi: Vui lòng cung cấp MONGO_URI trong file .env");
    process.exit(1); 
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Đã kết nối thành công tới MongoDB!');
        
        app.listen(PORT, () => {
            console.log(`Server đang chạy trên cổng ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Lỗi kết nối MongoDB:', err);
    });