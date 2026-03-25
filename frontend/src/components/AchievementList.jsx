import "./AchievementList.css";

function AchievementList({ achievements }) {
    return (
        <div className="achievements">
            <h3>Achievements</h3>

            {achievements.map(a => (
                <div key={a.id} className="achievement new">
                    <div className="achievement-bg"></div>
                    <div className="achievement-content">
                        🏆 {a.name}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AchievementList;