// src/App.jsx
import React, { useState } from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdded = () => setRefreshKey((k) => k + 1);

  return (
    <div style={styles.wrap}>
      <h1 style={{ marginBottom: 16 }}>Group Project – Frontend (React)</h1>
      <AddUser onAdded={handleAdded} />
      <UserList refreshKey={refreshKey} />
    </div>
  );
}

const styles = {
  wrap: {
    maxWidth: 800,
    margin: "40px auto",
    padding: "0 16px",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  },
};
