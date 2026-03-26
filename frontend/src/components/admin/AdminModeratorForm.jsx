import React from "react";

function AdminModeratorForm({ username, setUsername, password, setPassword, handleCreateModerator, handleKeyDown }) {
    return (
        <div className="admin-panel" style={{ border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <h3 style={{ color: "#d4af37", borderBottom: "1px solid rgba(212, 175, 55, 0.2)" }}>
                Authorize Moderator
            </h3>

            <input
                className="admin-input"
                placeholder="USERNAME IDENTIFIER"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <input
                className="admin-input"
                type="password"
                placeholder="ACCESS CODE"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <button className="admin-btn" onClick={handleCreateModerator}>
                Grant Clearance
            </button>
        </div>
    );
}

export default AdminModeratorForm;
