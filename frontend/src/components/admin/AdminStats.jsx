import React from "react";

function AdminStats({ stats }) {
    return (
        <div className="admin-panel">
            <h3>Global Metrics</h3>
            <div className="admin-stat">
                Active Fans <span>{stats.fans}</span>
            </div>
            <div className="admin-stat">
                Moderators <span>{stats.moderators}</span>
            </div>
            <div className="admin-stat" style={{ borderBottom: "none" }}>
                Archived Items <span>{stats.items}</span>
            </div>
        </div>
    );
}

export default AdminStats;
