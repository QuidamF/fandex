import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItems, getTags, getRanking, getCollectionInfo } from "../services/api";

function PublicView() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [view, setView] = useState("overview");
    const [collectionInfo, setCollectionInfo] = useState({ name: "LOADING...", description: "Connecting to global database..." });
    
    // filters
    const [filterTag, setFilterTag] = useState("");
    const [filterRarity, setFilterRarity] = useState("");

    useEffect(() => {
        getItems().then(setItems).catch(console.error);
        getTags().then(setTags).catch(console.error);
        getRanking()
            .then(data => {
                console.log("Ranking loaded:", data);
                setRanking(data || []);
            })
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                {/* TAG PROGRESS DISTRIBUTION */}
                <div style={{ background: "#1e293b", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                    <h3 style={{ margin: "0 0 15px 0" }}>Tag Distribution</h3>
                    {tagDistribution.map(t => (
                        <div key={t.name} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", paddingBottom: "10px", borderBottom: "1px solid #334155" }}>
                            <span style={{ textTransform: "capitalize" }}>{t.name}</span>
                            <span style={{ color: "#4ade80", fontWeight: "bold" }}>{t.count} items</span>
                        </div>
                    ))}
                </div>

                {/* RANKING LIVE */}
                <div style={{ background: "#1e293b", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                    <h3 style={{ margin: "0 0 15px 0" }}>Top Collectors</h3>
                    {ranking.length > 0 ? ranking.map((u, i) => (
                        <div key={u.user} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", padding: "5px 0" }}>
                            <span><span style={{ color: i === 0 ? "gold" : i === 1 ? "silver" : "#cd7f32", marginRight: "5px" }}>#{i + 1}</span> {u.user}</span>
                            <span style={{ fontWeight: "bold" }}>{u.count}</span>
                        </div>
                    )) : <p style={{ color: "#94a3b8" }}>No collectors yet</p>}
                </div>
            </div>
        );
    } else if (view === "collection") {
        content = (
            <div>
                {/* ITEMS BROWSER */}
                <div style={{ padding: "10px 0", display: "flex", gap: "10px", marginBottom: "20px" }}>
                    <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} style={{ padding: "8px", borderRadius: "5px", background: "#334155", color: "white", border: "none" }}>
                        <option value="">All Tags</option>
                        {tags.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                    </select>

                    <select value={filterRarity} onChange={(e) => setFilterRarity(e.target.value)} style={{ padding: "8px", borderRadius: "5px", background: "#334155", color: "white", border: "none" }}>
                        <option value="">All Rarities</option>
                        <option value="common">Common</option>
                        <option value="rare">Rare</option>
                        <option value="legendary">Legendary</option>
                    </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "15px" }}>
                    {filteredItems.map(item => (
                        <div key={item.id} style={{ background: "#1e293b", padding: "15px", borderRadius: "8px", borderLeft: item.rarity === 'legendary' ? '3px solid gold' : item.rarity === 'rare' ? '3px solid #3b82f6' : '3px solid #94a3b8' }}>
                            {item.image && (
                                <img src={item.image} alt={item.name} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "4px", marginBottom: "10px" }} />
                            )}
                            <h4 style={{ margin: "0 0 5px 0" }}>{item.name}</h4>
                            <p style={{ margin: 0, fontSize: "0.8rem", color: item.rarity === 'legendary' ? 'gold' : item.rarity === 'rare' ? '#3b82f6' : '#94a3b8', textTransform: "capitalize" }}>
                                {item.rarity}
                            </p>
                            <p style={{ margin: "5px 0 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>{(item.tags || []).join(", ")}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (view === "achievements") {
        content = (
            <div style={{ background: "#1e293b", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <h3 style={{ margin: "0 0 15px 0" }}>Global Achievements Overview</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
                    {[
                        { name: "First Item", desc: "Collect 1 item" },
                        { name: "Halfway There", desc: "Reach 50% progress" },
                        { name: "Legendary Hunter", desc: "Collect a legendary item" },
                        { name: "Completionist", desc: "Collect all items in FanDex" },
                        { name: "Speedrunner", desc: "Collect 10 items in 1 day" }
                    ].map(a => (
                        <div key={a.name} style={{ background: "#334155", padding: "15px", borderRadius: "8px" }}>
                            <h4 style={{ margin: "0 0 5px 0" }}>🏆 {a.name}</h4>
                            <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>{a.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
            {/* HERO */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h1 style={{ fontSize: "3.5rem", marginBottom: "10px", color: "#4ade80" }}>{collectionInfo.name}</h1>
                <p style={{ fontSize: "1.2rem", color: "#94a3b8" }}>
                    {collectionInfo.description}
                </p>
                <button 
                    onClick={() => navigate('/app')}
                    style={{ marginTop: "20px", padding: "10px 30px", fontSize: "1.2rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
                >
                    Enter App
                </button>
            </div>

            {/* GLOBAL STATS */}
            <div style={{ display: "flex", justifyContent: "space-around", background: "#1e293b", padding: "20px", borderRadius: "10px", marginBottom: "40px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "2rem", margin: "0 0 5px 0", color: "#3b82f6" }}>{items.length}</h3>
                    <p style={{ margin: 0, color: "#94a3b8" }}>Total Items</p>
                </div>
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "2rem", margin: "0 0 5px 0", color: "#f59e0b" }}>{tags.length}</h3>
                    <p style={{ margin: 0, color: "#94a3b8" }}>Total Tags</p>
                </div>
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "2rem", margin: "0 0 5px 0", color: "#ec4899" }}>8</h3>
                    <p style={{ margin: 0, color: "#94a3b8" }}>Achievements</p>
                </div>
            </div>

            {/* GLOBAL NAVIGATION MENU */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "30px", borderBottom: "1px solid #334155", paddingBottom: "20px" }}>
                <button 
                    onClick={() => setView("overview")}
                    style={{ padding: "10px 20px", background: view === "overview" ? "#3b82f6" : "transparent", color: "white", border: view === "overview" ? "none" : "1px solid #334155", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
                >
                    Overview
                </button>
                <button 
                    onClick={() => setView("collection")}
                    style={{ padding: "10px 20px", background: view === "collection" ? "#3b82f6" : "transparent", color: "white", border: view === "collection" ? "none" : "1px solid #334155", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
                >
                    Collection
                </button>
                <button 
                    onClick={() => setView("achievements")}
                    style={{ padding: "10px 20px", background: view === "achievements" ? "#3b82f6" : "transparent", color: "white", border: view === "achievements" ? "none" : "1px solid #334155", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
                >
                    Achievements
                </button>
            </div>

            {/* CURRENT VIEW CONTENT */}
            {content}
            
        </div>
    );
}

export default PublicView;
