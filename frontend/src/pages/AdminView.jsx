import { useEffect, useState } from "react";
import { getStats, createModerator, purgeSystem } from "../services/api";
import "./AdminView.css";

// Modular Components
import AdminHeader from "../components/admin/AdminHeader";
import AdminStats from "../components/admin/AdminStats";
import AdminModeratorForm from "../components/admin/AdminModeratorForm";
import AdminSystemPurge from "../components/admin/AdminSystemPurge";

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
            <AdminHeader onLogout={onLogout} />

            <main className="admin-content">
                <AdminStats stats={stats} />

                <AdminModeratorForm 
                    username={username} setUsername={setUsername}
                    password={password} setPassword={setPassword}
                    handleCreateModerator={handleCreateModerator}
                    handleKeyDown={handleKeyDown}
                />

                <AdminSystemPurge handlePurge={handlePurge} />
            </main>
        </div>
    );
}

export default AdminView;