import React from "react";

function PublicOverview({ ranking, tagDistribution }) {
    return (
        <div className="overview-grid">
            {/* TAG PROGRESS DISTRIBUTION */}
            <div className="public-panel">
                <h3>Curator's Distribution</h3>
                {tagDistribution.map(t => (
                    <div key={t.name} className="dist-row">
                        <span className="name">{t.name}</span>
                        <span className="count">{t.count}</span>
                    </div>
                ))}
                {tagDistribution.length === 0 && (
                    <p style={{ color: "#888", fontSize: "0.8rem", letterSpacing: "1px" }}>
                        NO CATEGORIES ARCHIVED
                    </p>
                )}
            </div>

            {/* RANKING LIVE */}
            <div className="public-panel">
                <h3>Hall of Fame</h3>
                {ranking.length > 0 ? ranking.map((u, i) => (
                    <div key={u.user} className="ranking-row">
                        <span>
                            <span className="rank-pos" style={{ 
                                color: i === 0 ? "#d4af37" : i === 1 ? "#e2e8f0" : i === 2 ? "#b45309" : "#888" 
                            }}>#{i + 1}</span> 
                            <span style={{ color: "#e5e5e5", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.85rem" }}>
                                {u.user}
                            </span>
                        </span>
                        <span className="rank-score">{u.count}</span>
                    </div>
                )) : (
                    <p style={{ color: "#888", fontSize: "0.8rem", letterSpacing: "1px" }}>
                        THE VAULTS ARE EMPTY
                    </p>
                )}
            </div>
        </div>
    );
}

export default PublicOverview;
