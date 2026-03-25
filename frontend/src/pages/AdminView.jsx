import { useEffect, useState } from "react";
import { getStats, createModerator } from "../services/api";
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
                    />

                    <input
                        className="admin-input"
                        type="password"
                        placeholder="ACCESS CODE"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="admin-btn" onClick={handleCreateModerator}>
                        Grant Clearance
                    </button>
                </div>
            </main>
        </div>
    );
}

export default AdminView;