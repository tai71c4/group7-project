import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AddUser from './AddUser'; // Import form

// URL API của backend, hãy chắc chắn backend đang chạy ở cổng này
const API_URL = 'http://localhost:3000/api/users';

function UserList() {
    const [users, setUsers] = useState([]);
    
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

    return (
        <div className="user-manager">
            {/* Đây là nơi duy nhất gọi form AddUser */}
            <AddUser onUserAdded={fetchUsers} />
            
            <hr />

            <div className="user-list">
                <h1>Danh sách người dùng từ MongoDB</h1>
                <ul>
                    {users.length > 0 ? (
                        users.map(user => (
                            <li key={user._id}>
                                <strong>{user.username}</strong> ({user.email})
                            </li>
                        ))
                    ) : (
                        <p>Chưa có người dùng nào...</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default UserList;