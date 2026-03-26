import "./Dashboard.css";

import { useEffect, useState } from "react";
import { 
    getItems, collectItem, getProgress, getAchievements, 
    getTags, getUserCollection, getCollectionInfo 
} from "../services/api";

// Modular Components
import DashHero from "../components/dashboard/DashHero";
import DashNav from "../components/dashboard/DashNav";
import DashOverview from "../components/dashboard/DashOverview";
import DashGallery from "../components/dashboard/DashGallery";
import DashMilestones from "../components/dashboard/DashMilestones";
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

    const renderContent = () => {
        switch (view) {
            case "home":
                return <DashOverview progress={progress} progressByTag={getProgressByTag()} />;
            case "items":
                return <DashGallery items={items} tags={tags} onCollect={handleCollect} />;
            case "achievements":
                return <DashMilestones achievements={achievements} />;
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-wrapper">
            <DashNav user={user} view={view} setView={setView} onLogout={onLogout} />

            <main className="dashboard-content">
                <DashHero collectionInfo={collectionInfo} />
                
                {renderContent()}

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