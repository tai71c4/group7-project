const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors'); // <-- 1. IMPORT CORS

const app = express();

// --- BẮT ĐẦU CẬP NHẬT ---
app.use(cors()); // <-- 2. SỬ DỤNG CORS (cho phép máy khác gọi API)
// --- KẾT THÚC CẬP NHẬT ---

app.use(express.json());

// --- Import file route (từ Hoạt động 3) ---
const userRoutes = require('./routes/user');
app.use(userRoutes);
// --- Hết ---

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI; 

// --- 4. Kết nối tới MongoDB ---
if (!MONGO_URI) {
    console.error("Lỗi: Vui lòng cung cấp MONGO_URI trong file .env");
    process.exit(1); 
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Đã kết nối thành công tới MongoDB!');
        
        // 5. CHUYỂN app.listen vào đây
        app.listen(PORT, () => {
            console.log(`Server đang chạy trên cổng ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Lỗi kết nối MongoDB:', err);
    });