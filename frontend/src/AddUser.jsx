import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [name, setName] = useState("");

  const handleAdd = () => {
    const newUser = { name };
    axios
      .post("http://localhost:3000/users", newUser)
      .then(() => {
        alert("Thêm người dùng thành công!");
        setName("");
      })
      .catch((err) => console.error("Lỗi khi thêm user:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Thêm người dùng mới</h2>
      <input
        type="text"
        placeholder="Nhập tên người dùng"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAdd} style={{ marginLeft: "10px" }}>
        Thêm
      </button>
    </div>
  );
};

export default AddUser;
