import React from "react";
import AchievementList from "../shared/AchievementList";

function DashMilestones({ achievements }) {
    if (achievements.length === 0) {
        return <p style={{ padding: "20px" }}>No achievements yet. Keep collecting!</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <AchievementList achievements={achievements} />
        </div>
    );
}

export default DashMilestones;
