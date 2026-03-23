import "./AchievementList.css";

function AchievementList({ achievements }) {
    return (
        <div className="achievements">
            <h3>Achievements</h3>

            {achievements.map(a => (
                <div key={a.id} className="achievement">
                    🏆 {a.name}
                </div>
            ))}
        </div>
    );
}

export default AchievementList;