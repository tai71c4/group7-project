// ==============================
// 🌐 server.js
// ==============================
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ------------------------------
// ⚙️ Cấu hình CORS cho React
// ------------------------------
app.use(cors({
  origin: 'http://localhost:3001', // Cho phép frontend React truy cập
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ------------------------------
// ⚙️ Middleware parse JSON
// ------------------------------
app.use(express.json());

// ------------------------------
// 📦 Kết nối route
// ------------------------------
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

// ------------------------------
// ⚙️ Biến môi trường
// ------------------------------
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';

// ------------------------------
// 🚀 Kết nối MongoDB và khởi động server
// ------------------------------
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Kết nối thành công đến MongoDB!');
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Lỗi kết nối MongoDB:', error.message);
  });

// ------------------------------
// 🧭 Kiểm tra server hoạt động
// ------------------------------
app.get('/', (req, res) => {
  res.send('Server đang hoạt động! 🚀');
});
