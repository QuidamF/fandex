import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItems, getTags } from "../services/api";

function PublicView() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [tags, setTags] = useState([]);
    
    // filters
    const [filterTag, setFilterTag] = useState("");
    const [filterRarity, setFilterRarity] = useState("");

    useEffect(() => {
        getItems().then(setItems);
        getTags().then(setTags);
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

    return (
        <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
            {/* HERO */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h1 style={{ fontSize: "3.5rem", marginBottom: "10px", color: "#4ade80" }}>FanDex</h1>
                <p style={{ fontSize: "1.2rem", color: "#94a3b8" }}>
                    The ultimate fan collection tracking platform. Discover, collect, and compete!
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                <div style={{ gridColumn: window.innerWidth > 768 ? "span 2" : "span 1" }}>
                    {/* ITEMS BROWSER */}
                    <h3>Collection Browser</h3>
                    <div style={{ padding: "10px 0", display: "flex", gap: "10px" }}>
                        <select onChange={(e) => setFilterTag(e.target.value)} style={{ padding: "8px", borderRadius: "5px", background: "#334155", color: "white", border: "none" }}>
                            <option value="">All Tags</option>
                            {tags.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                        </select>

                        <select onChange={(e) => setFilterRarity(e.target.value)} style={{ padding: "8px", borderRadius: "5px", background: "#334155", color: "white", border: "none" }}>
                            <option value="">All Rarities</option>
                            <option value="common">Common</option>
                            <option value="rare">Rare</option>
                            <option value="legendary">Legendary</option>
                        </select>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
                        {filteredItems.slice(0, 10).map(item => (
                            <div key={item.id} style={{ background: "#1e293b", padding: "15px", borderRadius: "8px", borderLeft: item.rarity === 'legendary' ? '3px solid gold' : item.rarity === 'rare' ? '3px solid #3b82f6' : '3px solid #94a3b8' }}>
                                <h4 style={{ margin: "0 0 5px 0" }}>{item.name}</h4>
                                <p style={{ margin: 0, fontSize: "0.8rem", color: item.rarity === 'legendary' ? 'gold' : item.rarity === 'rare' ? '#3b82f6' : '#94a3b8', textTransform: "capitalize" }}>
                                    {item.rarity}
                                </p>
                                <p style={{ margin: "5px 0 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>{(item.tags || []).join(", ")}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    {/* TAG PROGRESS DISTRIBUTION */}
                    <div style={{ background: "#1e293b", padding: "20px", borderRadius: "10px", marginBottom: "20px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                        <h3 style={{ margin: "0 0 15px 0" }}>Tag Distribution</h3>
                        {tagDistribution.map(t => (
                            <div key={t.name} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", paddingBottom: "10px", borderBottom: "1px solid #334155" }}>
                                <span style={{ textTransform: "capitalize" }}>{t.name}</span>
                                <span style={{ color: "#4ade80", fontWeight: "bold" }}>{t.count} items</span>
                            </div>
                        ))}
                    </div>

                    {/* RANKING MOCK */}
                    <div style={{ background: "#1e293b", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                        <h3 style={{ margin: "0 0 15px 0" }}>Top Collectors</h3>
                        {[
                            { user: "AshKetchum", count: 151 },
                            { user: "GaryOak", count: 140 },
                            { user: "Misty", count: 120 }
                        ].map((u, i) => (
                            <div key={u.user} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", padding: "5px 0" }}>
                                <span><span style={{ color: i === 0 ? "gold" : i === 1 ? "silver" : "#cd7f32", marginRight: "5px" }}>#{i + 1}</span> {u.user}</span>
                                <span style={{ fontWeight: "bold" }}>{u.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ACHIEVEMENTS MOCK */}
            <div style={{ marginTop: "40px", background: "#1e293b", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <h3 style={{ margin: "0 0 15px 0" }}>Global Achievements Overview</h3>
                <div style={{ display: "flex", gap: "15px", overflowX: "auto", paddingBottom: "10px" }}>
                    {[
                        { name: "First Item", desc: "Collect 1 item" },
                        { name: "Halfway There", desc: "Reach 50% progress" },
                        { name: "Legendary Hunter", desc: "Collect a legendary item" }
                    ].map(a => (
                        <div key={a.name} style={{ minWidth: "200px", background: "#334155", padding: "15px", borderRadius: "8px" }}>
                            <h4 style={{ margin: "0 0 5px 0" }}>🏆 {a.name}</h4>
                            <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>{a.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PublicView;
