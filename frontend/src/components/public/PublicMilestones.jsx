import React from "react";

function PublicMilestones({ achievements }) {
    return (
        <div className="public-panel">
            <h3>Global Milestones</h3>
            <div className="achievements-grid">
                {achievements.length > 0 ? achievements.map(a => (
                    <div key={a.id} className="public-achievement">
                        <h4>{a.name}</h4>
                        <p>{a.description}</p>
                    </div>
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
