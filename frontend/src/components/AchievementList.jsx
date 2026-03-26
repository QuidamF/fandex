import React from "react";
import AchievementCard from "./shared/AchievementCard";
import "./AchievementList.css";

function AchievementList({ achievements }) {
    return (
        <div className="achievements">
            <h3>Achievements</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                {achievements.map(a => (
                    <AchievementCard key={a.id} achievement={a} className="achievement new" />
                ))}
            </div>
        </div>
    );
}

export default AchievementList;