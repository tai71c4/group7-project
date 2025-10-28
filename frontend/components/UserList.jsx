// src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function UserList({ refreshKey }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Nếu dùng proxy: await api.get("/users")
      const res = await api.get("/users");
      // Kỳ vọng backend trả mảng user: [{ _id | id, name, email }, ...]
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Lấy danh sách user thất bại. Kiểm tra backend/PORT/CORS.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]); // khi thêm user xong, parent tăng refreshKey để gọi lại

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>Danh sách User</h2>
        <button onClick={fetchUsers} style={styles.refreshBtn}>Refresh</button>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : users.length === 0 ? (
        <p>Chưa có user nào.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id || u.id || idx}>
                <td style={styles.td}>{idx + 1}</td>
                <td style={styles.td}>{u.name}</td>
                <td style={styles.td}>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    background: "#fff",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  refreshBtn: { padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "8px 6px" },
  td: { borderBottom: "1px solid #f3f4f6", padding: "8px 6px" },
};
