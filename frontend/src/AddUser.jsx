import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

function AddUser({ onUserAdded }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newUser = { username, email, password };
            await axios.post(API_URL, newUser);
            alert('Thêm người dùng thành công!');
            setUsername('');
            setEmail('');
            setPassword('');
            onUserAdded(); 
        } catch (error) {
            console.error('Lỗi khi thêm người dùng:', error);
            alert('Thêm người dùng thất bại!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-user-form">
            <h2>Thêm người dùng mới</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Thêm User</button>
        </form>
    );
}

export default AddUser;