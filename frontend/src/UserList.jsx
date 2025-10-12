import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Lỗi khi tải user:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách người dùng</h2>
      <ul>
        {users.length > 0 ? (
          users.map((u, i) => <li key={i}>{u.name}</li>)
        ) : (
          <li>Không có người dùng nào.</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
