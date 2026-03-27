import React from "react";

function DashNav({ user, view, setView, onLogout }) {
    return (
        <header className="dashboard-header">
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ fontSize: "0.7rem", color: "#d4af37", letterSpacing: "3px", textTransform: "uppercase", border: "1px solid rgba(212, 175, 55, 0.3)", padding: "4px 10px" }}>
                    ARCHIVIST: <span style={{ color: "#fff" }}>{user?.username.toUpperCase()}</span>
                </div>
            </div>
            
            <nav className="dashboard-nav">
                <button 
                    className={`dashboard-tab vintage-tab ${view === "home" ? "active" : ""}`} 
                    onClick={() => setView("home")}
                >Overview
                </button>
                <button 
                    className={`dashboard-tab vintage-tab ${view === "items" ? "active" : ""}`} 
                    onClick={() => setView("items")}
                >Collection
                </button>
                <button 
                    className={`dashboard-tab vintage-tab ${view === "achievements" ? "active" : ""}`} 
                    onClick={() => setView("achievements")}
                >Milestones
                </button>
                <button 
                    className="dashboard-tab" 
                    onClick={onLogout}
                    style={{ color: "#888", border: "1px solid rgba(255,255,255,0.1)", padding: "5px 15px", borderRadius: "2px", marginLeft: "10px" }}
                >Logout
                </button>
            </nav>
        </header>
    );
}

export default DashNav;
