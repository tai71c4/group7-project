import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email
      });

      setSuccess(
        'Email khôi phục mật khẩu đã được gửi! ' +
        'Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn.'
      );
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Gửi yêu cầu thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Quên Mật Khẩu</h2>
        <p className="description">
          Nhập email đã đăng ký, chúng tôi sẽ gửi cho bạn link để đặt lại mật khẩu.
        </p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Nhập email của bạn"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
          </button>
        </form>

        <div className="auth-links">
          <p><a href="/login">← Quay lại đăng nhập</a></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;