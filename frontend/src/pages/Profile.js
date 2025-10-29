import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const res = await axios.get('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(res.data.user);
      setFormData({
        name: res.data.user.name,
        email: res.data.user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      setError('Không thể tải thông tin người dùng');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation nếu đổi mật khẩu
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        setError('Vui lòng nhập mật khẩu hiện tại');
        setLoading(false);
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError('Mật khẩu mới không khớp');
        setLoading(false);
        return;
      }
      if (formData.newPassword.length < 6) {
        setError('Mật khẩu mới phải có ít nhất 6 ký tự');
        setLoading(false);
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');
      const updateData = {
        name: formData.name
      };

      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const res = await axios.put(
        'http://localhost:5000/api/user/profile',
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user);
      setSuccess('Cập nhật thông tin thành công!');
      setIsEditing(false);
      
      // Reset password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Cập nhật thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (!user) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-section">
            <img 
              src={user.avatar || 'https://via.placeholder.com/150'} 
              alt="Avatar" 
              className="avatar-large"
            />
            <a href="/upload-avatar" className="btn-upload">Đổi ảnh đại diện</a>
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p className="email">{user.email}</p>
            <span className={`role-badge ${user.role}`}>{user.role}</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {!isEditing ? (
          <div className="profile-details">
            <div className="detail-row">
              <span className="label">Họ và tên:</span>
              <span className="value">{user.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Vai trò:</span>
              <span className="value">{user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Ngày tạo:</span>
              <span className="value">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>

            <div className="profile-actions">
              <button onClick={() => setIsEditing(true)} className="btn-primary">
                Chỉnh sửa thông tin
              </button>
              {user.role === 'admin' && (
                <a href="/admin/users" className="btn-secondary">
                  Quản lý người dùng
                </a>
              )}
              <button onClick={handleLogout} className="btn-danger">
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="edit-form">
            <div className="form-group">
              <label>Họ và tên:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email: (không thể thay đổi)</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="disabled-input"
              />
            </div>

            <hr />
            <h3>Đổi mật khẩu (tùy chọn)</h3>

            <div className="form-group">
              <label>Mật khẩu hiện tại:</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu hiện tại"
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu mới:</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label>Xác nhận mật khẩu mới:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu mới"
                minLength="6"
              />
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setIsEditing(false);
                  setError('');
                  setSuccess('');
                }} 
                className="btn-secondary"
              >
                Hủy
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;