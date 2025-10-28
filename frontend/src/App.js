import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(null); 

  // ... (Hàm fetchUsers, useEffect, handleEdit, handleDelete, resetForm
  //      không có gì thay đổi, giữ nguyên như Hoạt động 7) ...

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
      alert("Không thể kết nối tới backend!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setIsEditing(user._id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa user này?")) {
      try {
        await axios.delete(`${API_URL}/users/${userId}`);
        alert("Đã xóa user thành công");
        fetchUsers();
      } catch (error) {
        console.error("Lỗi khi xóa user:", error);
        alert("Xóa thất bại!");
      }
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setIsEditing(null);
  };

  // === CẬP NHẬT TẠI ĐÂY (Hoạt động 8) ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    // === PHẦN VALIDATION MỚI ===
    // 1. Kiểm tra Name (không được rỗng hoặc chỉ có khoảng trắng)
    if (!name.trim()) { 
      alert("Name không được để trống");
      return; // Dừng lại, không chạy tiếp
    }

    // 2. Kiểm tra Email (dùng regex đơn giản)
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Email không hợp lệ");
      return; // Dừng lại
    }
    // ============================

    const userData = { name: name.trim(), email: email.trim() }; // .trim() để cắt khoảng trắng thừa

    try {
      if (isEditing) {
        // --- SỬA (PUT) ---
        await axios.put(`${API_URL}/users/${isEditing}`, userData);
        alert("Cập nhật user thành công!");
      } else {
        // --- THÊM (POST) ---
        await axios.post(`${API_URL}/users`, userData);
        alert("Thêm user thành công!");
      }
      
      resetForm();
      fetchUsers();

    } catch (error) {
      console.error("Lỗi khi submit form:", error);
      alert("Thao tác thất bại!");
    }
  };


  // --- GIAO DIỆN (Không thay đổi) ---
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '600px', margin: 'auto' }}>
      
      <h2>{isEditing ? 'Sửa User' : 'Thêm User'}</h2>
      
      <form onSubmit={handleSubmit}>
        {/* ... (Phần input Name) ... */}
        <div> 
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên"
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        {/* ... (Phần input Email) ... */}
        <div style={{ marginTop: '10px' }}>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        
        {/* ... (Các nút) ... */}
        <button type="submit" style={{ marginTop: '10px' }}>
          {isEditing ? 'Cập nhật' : 'Thêm'}
        </button>
        
        {isEditing && (
          <button type="button" onClick={resetForm} style={{ marginLeft: '10px' }}>
            Hủy
          </button>
        )}
      </form>

      <hr style={{ margin: '20px 0' }} />

      <h2>Danh sách User</h2>
      <button onClick={fetchUsers}>Refresh</button>
      
      {/* ... (Phần danh sách users) ... */}
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {users.map(user => (
          <li key={user._id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{user.name}</strong>
              <br />
              <small>{user.email}</small>
            </div>
            
            <div>
              <button onClick={() => handleEdit(user)} style={{ marginRight: '5px' }}>
                Sửa
              </button>
              <button onClick={() => handleDelete(user._id)} style={{ backgroundColor: '#f44336', color: 'white' }}>
                Xóa
              </button>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;