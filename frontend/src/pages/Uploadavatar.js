import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Uploadavatar.css';

const UploadAvatar = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCurrentAvatar();
  }, []);

  const fetchCurrentAvatar = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentAvatar(res.data.user.avatar);
    } catch (err) {
      console.error('Không thể tải avatar hiện tại');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file hình ảnh');
      return;
    }

    // Kiểm tra kích thước file (giới hạn 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Kích thước file không được vượt quá 5MB');
      return;
    }

    setSelectedFile(file);
    setError('');

    // Tạo preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Vui lòng chọn một hình ảnh');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('avatar', selectedFile);

      const res = await axios.post(
        'http://localhost:5000/api/user/upload-avatar',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setSuccess('Cập nhật ảnh đại diện thành công!');
      setCurrentAvatar(res.data.avatarUrl);
      
      // Cập nhật user trong localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.avatar = res.data.avatarUrl;
      localStorage.setItem('user', JSON.stringify(user));

      // Reset form
      setSelectedFile(null);
      setPreview(null);

      // Chuyển về trang profile sau 2 giây
      setTimeout(() => {
        window.location.href = '/profile';
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload ảnh thất bại');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    setError('');
    setSuccess('');
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Cập Nhật Ảnh Đại Diện</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="avatar-preview-section">
          <div className="current-avatar">
            <h3>Ảnh hiện tại:</h3>
            <img 
              src={currentAvatar || 'https://via.placeholder.com/150'} 
              alt="Current Avatar"
              className="avatar-display"
            />
          </div>

          {preview && (
            <div className="new-avatar">
              <h3>Ảnh mới:</h3>
              <img 
                src={preview} 
                alt="New Avatar Preview"
                className="avatar-display"
              />
            </div>
          )}
        </div>

        <div className="upload-section">
          <div className="file-input-wrapper">
            <label htmlFor="file-input" className="file-input-label">
              📁 Chọn ảnh
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="file-input"
            />
          </div>

          {selectedFile && (
            <div className="file-info">
              <p>📄 {selectedFile.name}</p>
              <p className="file-size">
                Kích thước: {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          <div className="upload-guidelines">
            <h4>Hướng dẫn:</h4>
            <ul>
              <li>Chỉ chấp nhận file hình ảnh (JPG, PNG, GIF, WebP)</li>
              <li>Kích thước tối đa: 5MB</li>
              <li>Khuyến nghị: ảnh vuông, độ phân giải tối thiểu 300x300px</li>
            </ul>
          </div>
        </div>

        <div className="upload-actions">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="btn-primary"
          >
            {uploading ? 'Đang tải lên...' : '✓ Cập nhật ảnh'}
          </button>
          <button
            onClick={handleCancel}
            disabled={uploading}
            className="btn-secondary"
          >
            Hủy
          </button>
          <a href="/profile" className="btn-back">
            ← Quay lại trang cá nhân
          </a>
        </div>
      </div>
    </div>
  );
};

export default UploadAvatar;