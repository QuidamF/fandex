import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItems, getTags, getRanking, getCollectionInfo, getRarities, getAllAchievements } from "../services/api";
import ItemCard from "../components/ItemCard";
import "./PublicView.css";

function PublicView() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [rarities, setRarities] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [view, setView] = useState("overview");
    const [collectionInfo, setCollectionInfo] = useState({ name: "MUSEUM", description: "Connecting to global archive..." });
    
    // filters
    const [filterTag, setFilterTag] = useState("");
    const [filterRarity, setFilterRarity] = useState("");

    useEffect(() => {
        getItems().then(setItems).catch(console.error);
        getTags().then(setTags).catch(console.error);
        getRarities().then(setRarities).catch(console.error);
        getAllAchievements().then(setAchievements).catch(console.error);
        getRanking()
            .then(data => setRanking(data || []))
            .catch(console.error);
        getCollectionInfo()
            .then(res => {
                if (res.status) setCollectionInfo(res.data);
            })
            .catch(console.error);
    }, []);

    const filteredItems = items.filter(item => {
        const matchTag = filterTag ? item.tags?.includes(filterTag) : true;
        const matchRarity = filterRarity ? item.rarity === filterRarity : true;
        return matchTag && matchRarity;
    });

    const tagDistribution = tags.map(tag => {
        const count = items.filter(i => (i.tags || []).includes(tag.name)).length;
        return { name: tag.name, count };
    });

    let content;

    if (view === "overview") {
        content = (
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
                    {tagDistribution.length === 0 && <p style={{ color: "#888", fontSize: "0.8rem", letterSpacing: "1px" }}>NO CATEGORIES ARCHIVED</p>}
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
                    )) : <p style={{ color: "#888", fontSize: "0.8rem", letterSpacing: "1px" }}>THE VAULTS ARE EMPTY</p>}
                </div>
            </div>
        );
    } else if (view === "collection") {
        content = (
            <div>
                {/* ITEMS BROWSER */}
                <div className="public-filters">
                    <select className="public-select" value={filterTag} onChange={(e) => setFilterTag(e.target.value)}>
                        <option value="">All Categories</option>
                        {tags.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                    </select>

                    <select className="public-select" value={filterRarity} onChange={(e) => setFilterRarity(e.target.value)}>
                        <option value="">All Rarities</option>
                        {rarities.map(r => <option key={r.id} value={r.name}>{r.name.toUpperCase()}</option>)}
                    </select>
                </div>

                <div className="items-grid">
                    {filteredItems.map(item => (
                        <div key={item.id}>
                            <ItemCard item={item} />
                        </div>
                    ))}
                    {filteredItems.length === 0 && <p style={{ color: "#888", fontSize: "0.8rem", letterSpacing: "1px", gridColumn: "1/-1", textAlign: "center" }}>NO ARTIFACTS FOUND</p>}
                </div>
            </div>
        );
    } else if (view === "achievements") {
        content = (
            <div className="public-panel">
                <h3>Global Milestones</h3>
                <div className="achievements-grid">
                    {achievements.length > 0 ? achievements.map(a => (
                        <div key={a.id} className="public-achievement">
                            <h4>{a.name}</h4>
                            <p>{a.description}</p>
                        </div>
                    )) : <p style={{ color: "#888", fontSize: "0.8rem", letterSpacing: "1px" }}>NO MILESTONES DEFINED</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="public-wrapper">
            {/* HERO */}
            <header className="hero-section">
                <h1 className="hero-title">{collectionInfo.name}</h1>
                <p className="hero-subtitle">
                    {collectionInfo.description}
                </p>
                <button 
                    className="hero-btn"
                    onClick={() => navigate('/login')}
                >
                    Enter Private Vault
                </button>
            </header>

            {/* GLOBAL STATS */}
            <div className="public-stats">
                <div className="stat-block">
                    <h3>{items.length}</h3>
                    <p>Total Artifacts</p>
                </div>
                <div className="stat-block">
                    <h3>{tags.length}</h3>
                    <p>Categories</p>
                </div>
                <div className="stat-block">
                    <h3>{achievements.length}</h3>
                    <p>Milestones</p>
                </div>
            </div>

            {/* GLOBAL NAVIGATION MENU */}
            <nav className="public-nav">
                <button 
                    className={`public-tab ${view === "overview" ? "active" : ""}`}
                    onClick={() => setView("overview")}
                >
                    Hall of Fame
                </button>
                <button 
                    className={`public-tab ${view === "collection" ? "active" : ""}`}
                    onClick={() => setView("collection")}
                >
                    Grand Exhibition
                </button>
                <button 
                    className={`public-tab ${view === "achievements" ? "active" : ""}`}
                    onClick={() => setView("achievements")}
                >
                    Milestones
                </button>
            </nav>

            {/* CURRENT VIEW CONTENT */}
            <main className="public-content">
                {content}
            </main>
            
        </div>
    );
}

export default PublicView;
