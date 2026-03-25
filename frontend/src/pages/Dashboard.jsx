import "./Dashboard.css";

import { useEffect, useState } from "react";
import { getItems, collectItem, getProgress, getAchievements, getTags, getUserCollection, getCollectionInfo } from "../services/api";

import HomeView from "../components/HomeView";
import ItemsView from "../components/ItemsView";
import AchievementsView from "../components/AchievementsView";
import AchievementCelebration from "../components/AchievementCelebration";

function Dashboard({ user, onLogout }) {
    const [items, setItems] = useState([]);
    const [progress, setProgress] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [tags, setTags] = useState([]);
    const [view, setView] = useState("home");
    const [collectionInfo, setCollectionInfo] = useState({ name: "LOADING...", description: "Connecting to Vault..." });
    const [celebratingAchievements, setCelebratingAchievements] = useState([]);

    useEffect(() => {
        loadItems();
        loadExtras();
    }, []);

    const loadItems = async () => {
        const data = await getItems();
        const collection = await getUserCollection(user.id || 1);

        const mapped = data.map(item => ({
            ...item,
            collected: collection.some(c => c.id === item.id)
        }));

        setItems(mapped);
    };

    const loadExtras = async () => {
        const p = await getProgress(user.id || 1);
        const a = await getAchievements(user.id || 1);
        const t = await getTags();
        const c = await getCollectionInfo();

        setProgress(p);
        setAchievements(a);
        setTags(t.map(tag => tag.name));
        if (c.status) setCollectionInfo(c.data);
    };

    const handleCollect = async (itemId) => {
        const res = await collectItem(user.id || 1, itemId);

        if (res.status === false) return alert(res.message);

        setItems(prev =>
            prev.map(item =>
                item.id === itemId
                    ? { ...item, collected: true }
                    : item
            )
        );

        loadExtras();

        if (res.unlocked && res.unlocked.length > 0) {
            setCelebratingAchievements(res.unlocked);
        }
    };

    const getProgressByTag = () => {
        const tagMap = {};

        items.forEach(item => {
            (item.tags || []).forEach(tag => {
                if (!tagMap[tag]) {
                    tagMap[tag] = { total: 0, collected: 0 };
                }

                tagMap[tag].total += 1;

                if (item.collected) {
                    tagMap[tag].collected += 1;
                }
            });
        });

        return Object.entries(tagMap).map(([tag, data]) => ({
            tag,
            percentage: Math.round((data.collected / data.total) * 100),
            collected: data.collected,
            total: data.total
        }));
    };

    let content;

    if (view === "home") {
        content = <HomeView
            progress={progress}
            progressByTag={getProgressByTag()}
        />;
    } else if (view === "items") {
        content = <ItemsView items={items} tags={tags} onCollect={handleCollect} />;
    } else {
        content = <AchievementsView achievements={achievements} />;
    }

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div>
                    <h2 className="dashboard-title" style={{ margin: 0 }}>
                        {collectionInfo.name} <span>/// {collectionInfo.description}</span>
                    </h2>
                    <div style={{ fontSize: "0.8rem", color: "#d4af37", letterSpacing: "3px", marginTop: "8px", textTransform: "uppercase" }}>
                        Archivist: <span style={{ color: "#fff" }}>{user?.username}</span>
                    </div>
                </div>
                
                <nav className="dashboard-nav">
                    <button 
                        className={`dashboard-tab ${view === "home" ? "active" : ""}`} 
                        onClick={() => setView("home")}
                    >Overview
                    </button>
                    <button 
                        className={`dashboard-tab ${view === "items" ? "active" : ""}`} 
                        onClick={() => setView("items")}
                    >Collection
                    </button>
                    <button 
                        className={`dashboard-tab ${view === "achievements" ? "active" : ""}`} 
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

            <main className="dashboard-content">
                {content}

                {celebratingAchievements.length > 0 && (
                    <AchievementCelebration 
                        achievements={celebratingAchievements} 
                        onClose={() => setCelebratingAchievements([])} 
                    />
                )}
            </main>
        </div>
    );
}

export default Dashboard;