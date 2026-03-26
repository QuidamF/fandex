import React from "react";
import StatBanner from "../shared/StatBanner";

function PublicStats({ itemsCount, tagsCount, achievementsCount }) {
    const stats = {
        "Total Artifacts": itemsCount,
        "Categories": tagsCount,
        "Milestones": achievementsCount
    };

    return <StatBanner stats={stats} className="public-stats" />;
}

export default PublicStats;
