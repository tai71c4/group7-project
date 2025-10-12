require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// ✅ DÒNG NÀY PHẢI ĐẶT Ở ĐÂY!
// Nó phải nằm trước tất cả các app.use() của routes.
app.use(express.json());

// Kết nối routes
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Kết nối thành công đến MongoDB!');
        app.listen(PORT, () => {
            console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Lỗi kết nối MongoDB:', error.message);
    });