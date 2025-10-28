const express = require('express');
const app = express();

app.use(express.json());

// --- BẮT ĐẦU CẬP NHẬT ---
// 1. Import file route
const userRoutes = require('./routes/user');

// 2. Yêu cầu server sử dụng file route này
// (Bất kỳ request nào cũng sẽ được chuyển qua userRoutes để kiểm tra)
app.use(userRoutes);
// --- KẾT THÚC CẬP NHẬT ---

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});