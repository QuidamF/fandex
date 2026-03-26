import React from "react";

function PublicNav({ currentView, onViewChange }) {
    return (
        <nav className="public-nav">
            <button 
                className={`public-tab ${currentView === "overview" ? "active" : ""}`}
                onClick={() => onViewChange("overview")}
            >
                Hall of Fame
            </button>
            <button 
                className={`public-tab ${currentView === "collection" ? "active" : ""}`}
                onClick={() => onViewChange("collection")}
            >
                Grand Exhibition
            </button>
            <button 
                className={`public-tab ${currentView === "achievements" ? "active" : ""}`}
                onClick={() => onViewChange("achievements")}
            >
                Milestones
            </button>
        </nav>
    );
}

export default PublicNav;
