import React from "react";

function AdminHeader({ onLogout }) {
    return (
        <header className="admin-header">
            <h2 className="admin-title">
                SYSTEM DIRECTOR <span>/// ROOT ACCESS</span>
            </h2>
            <div style={{ display: "flex", gap: "20px" }}>
                <button className="admin-tab vintage-tab" onClick={() => window.location.href = "/"}>Home</button>
                <button className="admin-tab vintage-tab logout" onClick={onLogout}>Disconnect</button>
            </div>
        </header>
    );
}

export default AdminHeader;
