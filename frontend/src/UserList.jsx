import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AddUser from './AddUser'; // Import form thêm user

// URL API của backend
const API_URL = 'http://localhost:3000/users';

function UserList() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null); // State để theo dõi user đang được sửa
    const [formData, setFormData] = useState({ username: '', email: '' }); // State cho dữ liệu form sửa

    // Hàm gọi API để lấy danh sách users
    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data.data);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu users:", error);
        }
    }, []);

    // Chạy hàm fetchUsers một lần khi component được tải
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Hàm xử lý sự kiện Xóa
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                alert('Xóa người dùng thành công!');
                fetchUsers(); // Tải lại danh sách sau khi xóa
            } catch (error) {
                console.error("Lỗi khi xóa user:", error);
                alert('Xóa người dùng thất bại!');
            }
        }
    };

    // Hàm xử lý khi nhấn nút "Sửa"
    const handleEditClick = (user) => {
        setEditingUser(user);
        setFormData({ username: user.username, email: user.email });
    };

    // Hàm xử lý khi nhấn nút "Hủy" trong form sửa
    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    // Hàm xử lý khi submit form sửa
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/${editingUser._id}`, formData);
            alert('Cập nhật người dùng thành công!');
            setEditingUser(null); // Thoát khỏi chế độ sửa
            fetchUsers(); // Tải lại danh sách
        } catch (error) {
            console.error('Lỗi khi cập nhật user:', error);
            alert('Cập nhật thất bại!');
        }
    };
    
    // Hàm cập nhật state formData khi người dùng nhập liệu
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="user-manager">
            {/* Form thêm user mới */}
            <AddUser onUserAdded={fetchUsers} />
            <hr />
            <div className="user-list">
                <h1>Danh sách người dùng</h1>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            {editingUser && editingUser._id === user._id ? (
                                // GIAO DIỆN KHI ĐANG SỬA
                                <form onSubmit={handleUpdateSubmit} className="edit-form">
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleFormChange}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                    />
                                    <button type="submit">Lưu</button>
                                    <button type="button" onClick={handleCancelEdit}>Hủy</button>
                                </form>
                            ) : (
                                // GIAO DIỆN BÌNH THƯỜNG
                                <div className="user-item">
                                    <span>
                                        <strong>{user.username}</strong> ({user.email})
                                    </span>
                                    <div className="buttons">
                                        <button onClick={() => handleEditClick(user)}>Sửa</button>
                                        <button className="delete-btn" onClick={() => handleDelete(user._id)}>Xóa</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserList;