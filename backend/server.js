require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Cho phép frontend truy cập (fix lỗi CORS)
app.use(cors());
app.use(express.json());

// ✅ Log request để debug
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - Body:`, req.body);
  next();
});

// Import routes
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

// Kết nối MongoDB
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Kết nối thành công đến MongoDB!');
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Lỗi kết nối MongoDB:', error.message);
  });
