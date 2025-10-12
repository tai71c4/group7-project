import React from "react";
import AddUser from "./AddUser";
import UserList from "./UserList";

function App() {
  return (
    <div>
      <h1>Quản lý người dùng</h1>
      <AddUser />
      <UserList />
    </div>
  );
}

export default App;
