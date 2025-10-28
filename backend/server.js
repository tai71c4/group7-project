const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
require('dotenv').config(); // Đọc file .env
const cors = require('cors'); // Import cors

const app = express();

app.use(cors()); // Sử dụng cors
app.use(express.json());

// --- Import file route ---
const userRoutes = require('./routes/user');
app.use(userRoutes);
// --- Hết ---

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI; 

// --- Kết nối tới MongoDB ---
if (!MONGO_URI) {
    console.error("Lỗi: Vui lòng cung cấp MONGO_URI trong file .env");
    process.exit(1); 
}

mongoose.connect(MONGO_URI)
    .then(() => {
        // SAU KHI KẾT NỐI THÀNH CÔNG...
        console.log('Đã kết nối thành công tới MongoDB!'); // <--- NÓ SẼ HIỆN CÁI NÀY

        // ...THÌ MỚI CHẠY SERVER
        app.listen(PORT, () => {
            console.log(`Server đang chạy trên cổng ${PORT}`); // <--- RỒI NÓ HIỆN CÁI NÀY
        });
    })
    .catch((err) => {
        console.error('Lỗi kết nối MongoDB:', err);
    });