import React, { useState } from 'react';
import UserList from './UserList';
import AddUser from './AddUser';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleUserAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="app-container">
      <h1>Quản lý người dùng 👤</h1>
      <AddUser onUserAdded={handleUserAdded} />
      <UserList refresh={refresh} />
    </div>
  );
}

export default App;
