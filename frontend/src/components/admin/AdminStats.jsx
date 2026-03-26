import React from "react";
import StatBanner from "../shared/StatBanner";

function AdminStats({ stats }) {
    const bannerStats = {
        "Active Fans": stats.fans,
        "Moderators": stats.moderators,
        "Archived Items": stats.items
    };

    return <StatBanner stats={bannerStats} className="admin-panel" styles={{ flexWrap: "wrap", justifyContent: "flex-start", gap: "40px" }} />;
}

export default AdminStats;
