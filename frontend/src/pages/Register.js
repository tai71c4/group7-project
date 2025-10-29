import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password
      });

      setSuccess('Đăng ký thành công! Đang chuyển đến trang đăng nhập...');
      
      // Chuyển đến trang đăng nhập sau 2 giây
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Đăng Ký Tài Khoản</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              placeholder="Nhập email của bạn"
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>Xác nhận mật khẩu:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
              placeholder="Nhập lại mật khẩu"
              minLength="6"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <div className="auth-links">
          <p>Đã có tài khoản? <a href="/login">Đăng nhập ngay</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;