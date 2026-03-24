import AchievementList from "./AchievementList";

function AchievementsView({ achievements }) {
    if (achievements.length === 0) {
        return <p style={{ padding: "20px" }}>No achievements yet. Keep collecting!</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <AchievementList achievements={achievements} />
        </div>
    );
}

export default AchievementsView;