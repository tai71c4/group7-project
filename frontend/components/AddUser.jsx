// src/components/AddUser.jsx
import React, { useState } from "react";
import api from "../api";

export default function AddUser({ onAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!name.trim()) {
      alert("Name không được để trống");
      return false;
    }
    const okEmail = /\S+@\S+\.\S+/.test(email);
    if (!okEmail) {
      alert("Email không hợp lệ");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      // Nếu bạn dùng proxy trong package.json, có thể gọi: await api.post("/users", { name, email })
      await api.post("/users", { name, email });
      setName("");
      setEmail("");
      onAdded?.(); // yêu cầu parent reload list
    } catch (err) {
      console.error(err);
      alert("Thêm user thất bại. Kiểm tra backend/PORT/CORS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Thêm User</h2>
      <div style={styles.row}>
        <label style={styles.label}>Name</label>
        <input
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="VD: Nguyen Van A"
        />
      </div>
      <div style={styles.row}>
        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vd@domain.com"
        />
      </div>
      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "Đang lưu..." : "Thêm"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    background: "#ffffff",
  },
  row: { display: "flex", gap: 12, alignItems: "center", marginBottom: 12 },
  label: { width: 80, fontWeight: 600 },
  input: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    outline: "none",
  },
  button: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
  },
};
