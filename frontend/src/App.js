import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Đảm bảo đã chạy: npm install axios

// Lấy API URL từ file .env
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  // State để lưu danh sách user
  const [users, setUsers] = useState([]);
  
  // State cho form thêm user
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // --- HÀM GỌI API (Hoạt động 4) ---

  // 1. Hàm GET: Lấy tất cả user từ backend
  const fetchUsers = async () => {
    try {
      // Gọi API GET từ IP của Máy A (Backend)
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data); // Cập nhật danh sách user
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
      alert("Không thể kết nối tới backend. Hãy đảm bảo backend đang chạy!");
    }
  };

  // 2. Hàm POST: Xử lý khi nhấn nút "Thêm"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form reload lại trang
    
    if (!name || !email) {
      alert("Vui lòng nhập đủ tên và email");
      return;
    }
    
    try {
      const newUser = { name: name, email: email };
      
      // Gọi API POST tới IP của Máy A (Backend)
      await axios.post(`${API_URL}/users`, newUser);
      
      alert("Thêm user thành công!");
      fetchUsers(); // Tự động load lại danh sách user mới
      
      // Xóa trống form
      setName('');
      setEmail('');
      
    } catch (error) {
      console.error("Lỗi khi thêm user:", error);
      alert("Thêm user thất bại! (Xem console log)");
    }
  };

  // 3. useEffect: Tự động chạy hàm fetchUsers() 1 lần khi trang được tải
  useEffect(() => {
    fetchUsers();
  }, []); // Dấu [] nghĩa là "chỉ chạy 1 lần lúc đầu"

  // --- GIAO DIỆN (HTML/JSX) ---
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      
      <h2>Thêm User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên"
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Thêm</button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <h2>Danh sách User</h2>
      <button onClick={fetchUsers}>Refresh (Tải lại danh sách)</button>
      
      {users.length === 0 ? (
        <p>Chưa có user nào.</p>
      ) : (
        <ul>
          {/* Lặp qua mảng users và hiển thị */}
{users.map(user => (
            // Lưu ý: Dùng user._id vì đây là ID do MongoDB tự tạo
            <li key={user._id}> 
              <strong>{user.name}</strong> ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;