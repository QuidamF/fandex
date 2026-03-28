import React from "react";

function AdminHeader({ onLogout }) {
    return (
        <header className="admin-header">
            <h2 className="admin-title">
                SYSTEM DIRECTOR <span>/// ROOT ACCESS</span>
            </h2>
            <div style={{ display: "flex", gap: "10px" }}>
                <button className="admin-logout" style={{ background: "rgba(255,255,255,0.05)" }} onClick={() => window.location.href = "/"}>Home</button>
                <button className="admin-logout" onClick={onLogout}>Disconnect</button>
            </div>
        </header>
    );
}

export default AdminHeader;
