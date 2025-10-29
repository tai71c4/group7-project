import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

const ResetPassword = () => {
  const { token } = useParams(); // Lấy token từ URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { password, confirmPassword } = formData;

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
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

      setSuccess('Đặt lại mật khẩu thành công! Đang chuyển đến trang đăng nhập...');
      
      // Chuyển đến trang đăng nhập sau 2 giây
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Token không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Đặt Lại Mật Khẩu</h2>
        <p className="description">
          Nhập mật khẩu mới cho tài khoản của bạn.
        </p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Mật khẩu mới:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
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
              placeholder="Nhập lại mật khẩu mới"
              minLength="6"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Đang đặt lại...' : 'Đặt lại mật khẩu'}
          </button>
        </form>

        <div className="auth-links">
          <p><a href="/login">← Quay lại đăng nhập</a></p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;