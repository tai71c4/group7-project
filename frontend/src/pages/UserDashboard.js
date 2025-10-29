import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    checkAdmin();
    fetchUsers();
  }, []);

  const checkAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setCurrentUser(user);
    
    if (user.role !== 'admin') {
      alert('Bạn không có quyền truy cập trang này!');
      window.location.href = '/profile';
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(res.data.users);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      setError('Không thể tải danh sách người dùng');
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Bạn có chắc muốn xóa người dùng "${userName}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess(`Đã xóa người dùng "${userName}" thành công!`);
      setUsers(users.filter(user => user._id !== userId));

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Xóa người dùng thất bại');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleChangeRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    if (!window.confirm(`Bạn có chắc muốn chuyển vai trò thành "${newRole}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Đã cập nhật vai trò thành công!');
      
      // Cập nhật danh sách users
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Cập nhật vai trò thất bại');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Quản Lý Người Dùng</h1>
        <div className="header-actions">
          <a href="/profile" className="btn-secondary">Về trang cá nhân</a>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }} 
            className="btn-danger"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Tổng số người dùng</h3>
          <p className="stat-number">{users.length}</p>
        </div>
        <div className="stat-card">
          <h3>Quản trị viên</h3>
          <p className="stat-number">{users.filter(u => u.role === 'admin').length}</p>
        </div>
        <div className="stat-card">
          <h3>Người dùng thường</h3>
          <p className="stat-number">{users.filter(u => u.role === 'user').length}</p>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <img 
                    src={user.avatar || 'https://via.placeholder.com/40'} 
                    alt={user.name}
                    className="avatar-small"
                  />
                </td>
                <td>
                  <strong>{user.name}</strong>
                  {currentUser?._id === user._id && (
                    <span className="badge-current"> (Bạn)</span>
                  )}
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role === 'admin' ? 'Admin' : 'User'}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                <td>
                  <div className="action-buttons">
                    {currentUser?._id !== user._id && (
                      <>
                        <button
                          onClick={() => handleChangeRole(user._id, user.role)}
                          className="btn-role"
                          title="Đổi vai trò"
                        >
                          {user.role === 'admin' ? '👤 Chuyển User' : '👑 Chuyển Admin'}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id, user.name)}
                          className="btn-delete"
                          title="Xóa người dùng"
                        >
                          🗑️ Xóa
                        </button>
                      </>
                    )}
                    {currentUser?._id === user._id && (
                      <span className="text-muted">Không thể thao tác</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="empty-state">
            <p>Chưa có người dùng nào trong hệ thống</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;