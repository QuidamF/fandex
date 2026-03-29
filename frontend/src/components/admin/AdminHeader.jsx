import React from "react";

function AdminHeader({ onLogout }) {
    return (
        <header className="admin-header">
            <h2 className="admin-title">
                SYSTEM DIRECTOR <span>/// ROOT ACCESS</span>
            </h2>
            <div style={{ display: "flex", gap: "10px" }}>
                <button className="admin-logout" onClick={() => window.location.href = "/"}>Home</button>
                <button className="admin-logout" onClick={onLogout} style={{ color: "#ef4444", borderColor: "rgba(239, 68, 68, 0.3)" }}>Disconnect</button>
            </div>
        </header>
    );
}

export default AdminHeader;
