import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  
  // State cho form THÊM (từ Hoạt động 6)
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // === MỚI (Hoạt động 7) ===
  // State để theo dõi user nào ĐANG ĐƯỢC SỬA
  const [editingUser, setEditingUser] = useState(null); // (sẽ là null, hoặc là object user)
  
  // State cho dữ liệu trong form SỬA
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  // ==========================

  // Hàm GET (từ Hoạt động 6)
  const fetchUsers = async () => {
    try {
      // SỬA LẠI ĐƯỜNG DẪN API CỦA BẠN NẾU CẦN
      const response = await axios.get('http://localhost:3000/users'); 
      setUsers(response.data);
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  // Hàm POST (từ Hoạt động 6)
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name: newName, email: newEmail };
      const response = await axios.post('http://localhost:3000/users', newUser);
      setUsers([...users, response.data]);
      setNewName('');
      setNewEmail('');
    } catch (error) {
      console.error('Lỗi khi thêm user:', error);
    }
  };

  // === MỚI (Hoạt động 7): Hàm DELETE ===
  const handleDelete = async (id) => {
    try {
      // 1. Gọi API DELETE
      await axios.delete(`http://localhost:3000/users/${id}`);
      
      // 2. Cập nhật lại state ở frontend (lọc user đã xóa ra)
      setUsers(users.filter(user => user._id !== id));
      
    } catch (error) {
      console.error('Lỗi khi xóa user:', error);
    }
  };

  // === MỚI (Hoạt động 7): Hàm khi nhấn nút "Sửa" ===
  // (Lưu user vào state và điền thông tin vào form Sửa)
  const handleEdit = (user) => {
    setEditingUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
  };

  // === MỚI (Hoạt động 7): Hàm khi submit form "Cập nhật" (PUT) ===
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return; // Thoát nếu không có user nào đang được sửa

    try {
      const updatedData = { name: updatedName, email: updatedEmail };
      
      // 1. Gọi API PUT để cập nhật
      const response = await axios.put(
        `http://localhost:3000/users/${editingUser._id}`, 
        updatedData
      );

      // 2. Cập nhật lại danh sách users trong state
      setUsers(users.map(u => (u._id === editingUser._id ? response.data : u)));

      // 3. Reset trạng thái sửa
      setEditingUser(null);
      setUpdatedName('');
      setUpdatedEmail('');
    } catch (error)
    {
      console.error('Lỗi khi cập nhật user:', error);
    }
  };

  return (
    <div>
      {/* FORM THÊM USER (Hoạt động 6) */}
      <h2>Thêm User</h2>
      {/* ... code form của bạn ... */}
      <form onSubmit={handleAddUser}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Nhập tên"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          placeholder="Nhập email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <button type="submit">Thêm</button>
      </form>

      <hr />

      {/* DANH SÁCH USER */}
      <h2>Danh sách User</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} ({user.email})
            
            {/* === MỚI (Hoạt động 7): Thêm 2 nút Sửa/Xóa === */}
            <button onClick={() => handleEdit(user)}>Sửa</button>
            <button onClick={() => handleDelete(user._id)}>Xóa</button>
          </li>
        ))}
      </ul>

      <hr />

      {/* === MỚI (Hoạt động 7): FORM SỬA USER === */}
      {/* (Form này chỉ hiện ra khi bạn nhấn nút "Sửa") */}
      {editingUser && (
        <div>
          <h2>Sửa User: {editingUser.name}</h2>
          <form onSubmit={handleUpdateUser}>
            <input
              type="text"
              placeholder="Tên mới"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email mới"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              required
            />
            <button type="submit">Cập nhật</button>
            {/* Nút Hủy để đóng form sửa */}
            <button type="button" onClick={() => setEditingUser(null)}>Hủy</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserList;