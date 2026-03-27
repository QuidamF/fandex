import React from "react";
import AchievementCard from "./AchievementCard";
import "./AchievementList.css";

function AchievementList({ achievements }) {
    return (
        <div className="achievements-layout">
            <h3 className="achievements-title">Achievements</h3>
            <div className="achievements-grid">
                {achievements.map(a => (
                    <AchievementCard key={a.id} achievement={a} className="achievement new" />
                ))}
            </div>
        </div>
    );
}

export default AchievementList;