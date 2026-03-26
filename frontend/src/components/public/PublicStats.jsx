import React from "react";

function PublicStats({ itemsCount, tagsCount, achievementsCount }) {
    return (
        <div className="public-stats">
            <div className="stat-block">
                <h3>{itemsCount}</h3>
                <p>Total Artifacts</p>
            </div>
            <div className="stat-block">
                <h3>{tagsCount}</h3>
                <p>Categories</p>
            </div>
            <div className="stat-block">
                <h3>{achievementsCount}</h3>
                <p>Milestones</p>
            </div>
        </div>
    );
}

export default PublicStats;
