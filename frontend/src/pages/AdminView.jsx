import { useEffect, useState } from "react";
import { getStats, createModerator, purgeSystem } from "../services/api";
import "./AdminView.css";

function AdminView({ user, onLogout }) {
    const [stats, setStats] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        getStats().then(setStats);
    }, []);

    const handleCreateModerator = async () => {
        if (!username || !password) {
            alert("Fill all fields");
            return;
        }

        const res = await createModerator(username, password);

        if (res.status) {
            alert("Moderator created!");
            setUsername("");
            setPassword("");
            getStats().then(setStats);
        } else {
            alert(res.message);
        }
    };

    const handlePurge = async () => {
        if (!window.confirm("WARNING: This will DESTROY all artifacts, categories, milestones, and users. Are you absolutely sure?")) return;
        if (!window.confirm("FINAL WARNING: This action is irreversible. Execute System Purge?")) return;
        
        const res = await purgeSystem();
        alert(res.message);
        if (res.status) {
            getStats().then(setStats);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCreateModerator();
        }
    };

    if (!stats) return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#a39171", background: "#110e0d" }}><p>Initializing Master Archive...</p></div>;

    return (
        <div className="admin-wrapper">
            <header className="admin-header">
                <h2 className="admin-title">
                    SYSTEM DIRECTOR <span>/// ROOT ACCESS</span>
                </h2>
                <button className="admin-logout" onClick={onLogout}>Disconnect</button>
            </header>

            <main className="admin-content">
                {/* 📊 STATS */}
                <div className="admin-panel">
                    <h3>Global Metrics</h3>
                    <div className="admin-stat">
                        Active Fans <span>{stats.fans}</span>
                    </div>
                    <div className="admin-stat">
                        Moderators <span>{stats.moderators}</span>
                    </div>
                    <div className="admin-stat" style={{ borderBottom: "none" }}>
                        Archived Items <span>{stats.items}</span>
                    </div>
                </div>

                {/* 🟡 CREATE MODERATOR */}
                <div className="admin-panel" style={{ border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                    <h3 style={{ color: "#d4af37", borderBottom: "1px solid rgba(212, 175, 55, 0.2)" }}>
                        Authorize Moderator
                    </h3>

                    <input
                        className="admin-input"
                        placeholder="USERNAME IDENTIFIER"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <input
                        className="admin-input"
                        type="password"
                        placeholder="ACCESS CODE"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <button className="admin-btn" onClick={handleCreateModerator}>
                        Grant Clearance
                    </button>
                </div>

                {/* 🔴 PURGE SYSTEM */}
                <div className="admin-panel" style={{ border: "1px solid rgba(239, 68, 68, 0.2)", marginTop: "40px" }}>
                    <h3 style={{ color: "#ef4444", borderBottom: "none", margin: "0 0 15px 0" }}>DANGER ZONE</h3>
                    <p style={{ color: "#a0a0a0", fontSize: "0.85rem", marginBottom: "20px", lineHeight: "1.5" }}>
                        Initialize a complete database wipe. This targets and truncates all Artifacts, Categories, Milestones, Fans, and Curators. The core Museum identity and Root Admin access will be spared.
                    </p>
                    <button 
                        style={{ 
                            width: "100%", padding: "12px", background: "rgba(239, 68, 68, 0.05)", 
                            border: "1px solid rgba(239, 68, 68, 0.4)", color: "#ef4444", 
                            textTransform: "uppercase", letterSpacing: "3px", cursor: "pointer", transition: "0.3s" 
                        }} 
                        onMouseEnter={(e) => { e.target.style.background="rgba(239,68,68,0.2)"; e.target.style.boxShadow="0 0 15px rgba(239,68,68,0.3)"; }}
                        onMouseLeave={(e) => { e.target.style.background="rgba(239,68,68,0.05)"; e.target.style.boxShadow="none"; }}
                        onClick={handlePurge}
                    >
                        EXECUTE SYSTEM PURGE
                    </button>
                </div>
            </main>
        </div>
    );
}

export default AdminView;