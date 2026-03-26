import React from "react";

function AdminHeader({ onLogout }) {
    return (
        <header className="admin-header">
            <h2 className="admin-title">
                SYSTEM DIRECTOR <span>/// ROOT ACCESS</span>
            </h2>
            <button className="admin-logout" onClick={onLogout}>Disconnect</button>
        </header>
    );
}

export default AdminHeader;
