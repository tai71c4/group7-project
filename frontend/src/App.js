// File: src/App.js

import React from 'react';
import UserList from './UserList'; // Chỉ import UserList
import './App.css';

function App() {
  return (
    <div className="App">
      <main>
        {/* ✅ ĐÚNG: Chỉ có MỘT dòng UserList ở đây */}
        <UserList />

        {/* ❌ SAI: Nếu bạn có dòng <AddUser /> ở đây, HÃY XÓA NÓ ĐI */}
      </main>
    </div>
  );
}

export default App;