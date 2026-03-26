import React from "react";
import AchievementCard from "../shared/AchievementCard";

function PublicMilestones({ achievements }) {
    return (
        <div className="public-panel">
            <h3>Global Milestones</h3>
            <div className="achievements-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
                {achievements.length > 0 ? achievements.map(a => (
                    <AchievementCard key={a.id} achievement={a} />
                )) : (
                    <p style={{ color: "#888", fontSize: "0.8rem", letterSpacing: "1px" }}>
                        NO MILESTONES DEFINED
                    </p>
                )}
            </div>
        </div>
    );
}

export default PublicMilestones;
