const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Load biến môi trường từ .env TRƯỚC khi dùng mongoose
const envPath = path.resolve(__dirname, '.env');
console.log('📁 Đường dẫn .env:', envPath);
console.log('📄 Nội dung .env:\n', fs.readFileSync(envPath, 'utf-8'));
dotenv.config({ path: envPath });

console.log('🔍 MONGO_URI:', process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Kết nối MongoDB Atlas thành công!'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên http://localhost:${PORT}`);
});
