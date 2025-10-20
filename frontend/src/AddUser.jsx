import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/users'; // ✅ Backend chạy tại port 3000

function AddUser({ onUserAdded }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username.trim()) return alert('Tên người dùng không được để trống!');
    if (!/\S+@\S+\.\S+/.test(email)) return alert('Email không hợp lệ!');
    if (password.length < 4) return alert('Mật khẩu phải ít nhất 4 ký tự!');

    try {
      await axios.post(API_URL, { username, email, password });
      alert('✅ Thêm người dùng thành công!');
      setUsername('');
      setEmail('');
      setPassword('');
      onUserAdded();
    } catch (error) {
      console.error('❌ Lỗi khi thêm người dùng:', error);
      alert('Thêm người dùng thất bại!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <h2>➕ Thêm người dùng mới</h2>
      <input
        type="text"
        placeholder="Tên người dùng"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Địa chỉ Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Thêm User</button>
    </form>
  );
}

export default AddUser;
