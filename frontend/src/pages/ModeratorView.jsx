import { useState, useEffect, useRef } from "react";
import { createItem, getTags, createTag, getItems, getStats, updateItem, deleteItem, deleteTag, getCollectionInfo, updateCollectionInfo, getAllAchievements, createAchievement, deleteAchievement, getRarities, createRarity, deleteRarity } from "../services/api";
import ItemCard from "../components/ItemCard";
import "./ModeratorView.css";

function ModeratorView({ user, onLogout }) {
    const [view, setView] = useState("minting");

    // form state
    const [editItemId, setEditItemId] = useState(null);
    const [name, setName] = useState("");
    const [rarity, setRarity] = useState("common");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const fileInputRef = useRef(null);

    const [newTag, setNewTag] = useState("");

    const [tags, setTags] = useState([]);
    const [rarities, setRarities] = useState([]);
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState(null);
    const [achievements, setAchievements] = useState([]);
    
    // gallery filters
    const [filterTag, setFilterTag] = useState("");
    const [filterRarity, setFilterRarity] = useState("");

    // identity
    const [collectionName, setCollectionName] = useState("");
    const [collectionDesc, setCollectionDesc] = useState("");
    
    // new rarities
    const [newRarityName, setNewRarityName] = useState("");
    const [newRarityColor, setNewRarityColor] = useState("#c084fc");
    const [newRarityTier, setNewRarityTier] = useState("");

    // achievements
    const [achName, setAchName] = useState("");
    const [achDesc, setAchDesc] = useState("");
    const [achType, setAchType] = useState("total_items");
    const [achValue, setAchValue] = useState("");
    const [achExtra, setAchExtra] = useState("");

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (view === "minting") {
            getTags().then(res => {
                setTags(res);
                if (res.length > 0 && !tag) setTag(res[0].name);
            });
            getRarities().then(res => {
                setRarities(res);
                if (res.length > 0 && rarity === "common") setRarity(res[0].name);
            });
        } else if (view === "gallery") {
            getItems().then(setItems);
            getStats().then(setStats);
            getTags().then(setTags);
            getRarities().then(setRarities);
        } else if (view === "identity") {
            getCollectionInfo().then(res => {
                if (res.status) {
                    setCollectionName(res.data.name);
                    setCollectionDesc(res.data.description);
                }
            });
            getRarities().then(setRarities);
        } else if (view === "trophies") {
            getAllAchievements().then(setAchievements);
            getTags().then(setTags);
            getRarities().then(setRarities);
        }
    }, [view]);

    // Item CRUD
    const handleSaveItem = async () => {
        if (!tag) {
            alert("Select a tag");
            return;
        }
        const payload = { name, rarity, tags: [tag], description, image };
        const res = editItemId ? await updateItem(editItemId, payload) : await createItem(payload);

        if (res.status) {
            handleClearForm();
            alert(res.message);
        } else {
            alert(res.message);
        }
    };

    const handleDeleteItem = async () => {
        if (!editItemId) return;
        if (!window.confirm("Are you sure you want to completely destroy this artifact?")) return;
        const res = await deleteItem(editItemId);
        if (res.status) {
            handleClearForm();
        } else {
            alert(res.message);
        }
    };

    const handleEditItemClick = (item) => {
        setEditItemId(item.id);
        setName(item.name);
        setRarity(item.rarity);
        setDescription(item.description || "");
        setImage(item.has_image ? `http://localhost:5000/api/items/${item.id}/image` : "");
        setTag(item.tags.length > 0 ? item.tags[0] : "");
        setView("minting");
    };

    const handleClearForm = () => {
        if (editItemId) setView("gallery");
        
        setEditItemId(null);
        setName("");
        setRarity(rarities.length > 0 ? rarities[0].name : "common");
        setDescription("");
        setImage("");
        setTag(tags.length > 0 ? tags[0].name : "");
        
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Tag CRUD
    const handleCreateTag = async () => {
        if (!newTag) return;
        const res = await createTag(newTag);
        if (res.status) {
            setNewTag("");
            getTags().then(setTags);
        } else {
            alert(res.message);
        }
    };

    const handleDeleteTag = async (tag_id) => {
        if (!window.confirm("Are you sure you want to delete this category? All artifacts using it will lose this tag.")) return;
        const res = await deleteTag(tag_id);
        if (res.status) {
            getTags().then(setTags);
        }
    };

    const handleSaveCollectionInfo = async () => {
        if (!collectionName) return;
        const res = await updateCollectionInfo(collectionName, collectionDesc);
        alert(res.message);
    };

    const handleCreateRarity = async () => {
        if (!newRarityName || !newRarityTier) {
            alert("Rarity must have a Name and a Tier value (number)");
            return;
        }
        const res = await createRarity(newRarityName, newRarityColor, newRarityTier);
        if (res.status) {
            setNewRarityName("");
            setNewRarityTier("");
            getRarities().then(setRarities);
        } else {
            alert(res.message);
        }
    };
    
    const handleDeleteRarity = async (r_id) => {
        if (!window.confirm("Destroy this rarity? Items tied to it will become standard.")) return;
        await deleteRarity(r_id);
        getRarities().then(setRarities);
    };

    const handleCreateTrophy = async () => {
        if (!achName || !achValue) return;
        const payload = {
            name: achName,
            description: achDesc,
            condition_type: achType,
            condition_value: parseInt(achValue),
            condition_extra: achExtra
        };
        const res = await createAchievement(payload);
        if (res.status) {
            setAchName(""); setAchDesc(""); setAchValue(""); setAchExtra("");
            getAllAchievements().then(setAchievements);
        } else { alert(res.message); }
    };

    const handleDeleteTrophy = async (id) => {
        if (!window.confirm("Destroy this trophy entirely?")) return;
        const res = await deleteAchievement(id);
        if (res.status) getAllAchievements().then(setAchievements);
    };

    const filteredItems = items.filter(item => {
        const matchesTag = filterTag ? item.tags.includes(filterTag) : true;
        const matchesRarity = filterRarity ? item.rarity === filterRarity : true;
        return matchesTag && matchesRarity;
    });

    return (
        <div className="mod-wrapper">
            <header className="mod-header">
                <h2 className="mod-title">
                    CURATOR'S DESK <span>/// MODERATOR ACCESS</span>
                </h2>
                
                <nav className="mod-nav">
                    <button 
                        className={`mod-tab ${view === "minting" ? "active" : ""}`} 
                        onClick={() => setView("minting")}
                    >Studio
                    </button>
                    <button 
                        className={`mod-tab ${view === "gallery" ? "active" : ""}`} 
                        onClick={() => setView("gallery")}
                    >Gallery
                    </button>
                    <button 
                        className={`mod-tab ${view === "identity" ? "active" : ""}`} 
                        onClick={() => setView("identity")}
                    >Identity
                    </button>
                    <button 
                        className={`mod-tab ${view === "trophies" ? "active" : ""}`} 
                        onClick={() => setView("trophies")}
                    >Milestones
                    </button>
                    <button 
                        className="mod-tab" 
                        onClick={onLogout}
                        style={{ color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", padding: "5px 15px", borderRadius: "2px", marginLeft: "10px" }}
                    >Disconnect
                    </button>
                </nav>
            </header>

            <main className="mod-content" style={view === "gallery" || view === "identity" || view === "trophies" ? { display: "block" } : {}}>
                {view === "minting" && (
                    <>
                        {/* 🟡 MULTI-COL CREATE/EDIT ITEM ROOT */}
                        <div className="mod-panel" style={{ gridColumn: "1 / -1", border: "1px solid rgba(212, 175, 55, 0.4)" }}>
                            
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(212, 175, 55, 0.2)", paddingBottom: "15px", marginBottom: "30px" }}>
                                <h3 style={{ margin: 0, padding: 0, border: "none" }}>{editItemId ? "Modify Artifact" : "Index New Artifact"}</h3>
                            </div>

                            {(tags.length === 0 || rarities.length === 0) && (
                                <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px dashed rgba(239, 68, 68, 0.5)", color: "#ef4444", padding: "20px", textAlign: "center", marginBottom: "30px", fontSize: "0.9rem", letterSpacing: "1px" }}>
                                    <strong>⚠️ SYSTEM LOCK ACTIVATED</strong><br/>
                                    You must initialize at least one <strong>Category</strong> and one <strong>Rarity Tier</strong> using the foundational modules below before you can index artifacts.
                                </div>
                            )}

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px" }}>
                                {/* Left Side: Matrix Inputs */}
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <input className="mod-input" placeholder="ARTIFACT NAME" value={name} onChange={(e) => setName(e.target.value)} disabled={tags.length === 0 || rarities.length === 0} />
                                    
                                    <select className="mod-select" value={rarity} onChange={(e) => setRarity(e.target.value)} disabled={tags.length === 0 || rarities.length === 0}>
                                        {rarities.length === 0 ? <option value="">Awaiting Rarity Definition...</option> : null}
                                        {rarities.map(r => (
                                            <option key={r.id} value={r.name}>{r.name.toUpperCase()}</option>
                                        ))}
                                    </select>
                                    
                                    <select className="mod-select" value={tag} onChange={(e) => setTag(e.target.value)} disabled={tags.length === 0 || rarities.length === 0}>
                                        <option value="">Select Primary Category...</option>
                                        {tags.map(t => (
                                            <option key={t.id} value={t.name}>{t.name}</option>
                                        ))}
                                    </select>

                                    <input className="mod-input" placeholder="ARTIFACT DESCRIPTION" value={description} onChange={(e) => setDescription(e.target.value)} disabled={tags.length === 0 || rarities.length === 0} />
                                    <input ref={fileInputRef} className="mod-file" type="file" onChange={handleFile} accept="image/*" disabled={tags.length === 0 || rarities.length === 0} />
                                    
                                    <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                                        <button className="mod-btn" onClick={handleSaveItem} style={{ color: "#d4af37", borderColor: "rgba(212, 175, 55, 0.4)", flex: 1 }} disabled={tags.length === 0 || rarities.length === 0}>
                                            {editItemId ? "Update Artifact" : "Mint Artifact"}
                                        </button>
                                        
                                        <button className="mod-btn" onClick={handleClearForm} style={{ color: "#888", borderColor: "rgba(255,255,255,0.2)", flex: 0.4 }}>
                                            {editItemId ? "Cancel" : "Clear"}
                                        </button>

                                        {editItemId && (
                                            <button className="mod-btn" onClick={handleDeleteItem} style={{ color: "#ef4444", borderColor: "rgba(239, 68, 68, 0.4)", flex: 0.4 }}>Destroy</button>
                                        )}
                                    </div>
                                </div>

                                {/* Right Side: Live Component Output */}
                                <div style={{ borderLeft: "1px dashed rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                    <h4 style={{ color: "#888", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "30px", fontSize: "0.8rem" }}>Live Projection</h4>
                                    <div style={{ pointerEvents: "none" }}>
                                        <ItemCard item={{
                                            id: "preview",
                                            name: name || "UNDEFINED",
                                            rarity: rarity || "common",
                                            rarity_color: rarities.find(r => r.name === rarity)?.color_hex || "#9ca3af",
                                            image: image,
                                            has_image: !!image
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 🟣 CREATE TAG (Now Bottom Left Col) */}
                        <div className="mod-panel">
                            <h3>Catalogue Category</h3>
                            <input
                                className="mod-input"
                                placeholder="NEW CATEGORY NAME"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                            />
                            <button className="mod-btn" onClick={handleCreateTag}>Register Category</button>

                            {tags.length > 0 && (
                                <div style={{ marginTop: "40px" }}>
                                    <h4 style={{ color: "#a39171", fontFamily: "'Playfair Display', serif", fontWeight: 300, borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px", marginBottom: "15px", textTransform: "uppercase", letterSpacing: "2px" }}>Active Categories</h4>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        {tags.map(t => (
                                            <li key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.85rem", color: "#e5e5e5", letterSpacing: "1px" }}>
                                                {t.name}
                                                <button onClick={() => handleDeleteTag(t.id)} style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.75rem", textTransform: "uppercase", transition: "0.3s" }} onMouseEnter={(e) => e.target.style.textShadow = "0 0 5px red"} onMouseLeave={(e) => e.target.style.textShadow = "none"}>[ Scrap ]</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* 🟢 RARITY STUDIO (Now Bottom Right Col) */}
                        <div className="mod-panel">
                            <h3 style={{ color: "#c084fc" }}>Rarity Engineering</h3>
                            <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "20px" }}>Define custom hierarchy tiers and visual auras.</p>
                            
                            <div style={{ display: "flex", flexDirection: "column", gap: "15px", background: "rgba(0,0,0,0.2)", padding: "20px", borderRadius: "4px", border: "1px solid rgba(192, 132, 252, 0.2)" }}>
                                <div>
                                    <label style={{ display: "block", color: "#c084fc", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "5px" }}>1. Rarity Title</label>
                                    <input className="mod-input" placeholder="e.g. Holographic..." value={newRarityName} onChange={e => setNewRarityName(e.target.value)} />
                                </div>
                                
                                <div>
                                    <label style={{ display: "block", color: "#c084fc", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "5px" }}>2. Hierarchy Level</label>
                                    <input className="mod-input" type="number" min="1" placeholder="e.g. 5 (Highest Rank)..." value={newRarityTier} onChange={e => setNewRarityTier(e.target.value)} />
                                </div>

                                <div>
                                    <label style={{ display: "block", color: "#c084fc", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "5px" }}>3. Aura Color (HEX)</label>
                                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                        <input type="color" value={newRarityColor} onChange={e => setNewRarityColor(e.target.value)} style={{ width: "60px", height: "45px", padding: "0", border: "1px solid #c084fc", borderRadius: "4px", cursor: "pointer", background: "transparent" }} />
                                        <span style={{ color: newRarityColor, fontFamily: "monospace", fontSize: "1.2rem", textShadow: `0 0 10px ${newRarityColor}`, letterSpacing: "2px" }}>{newRarityColor.toUpperCase()}</span>
                                    </div>
                                </div>

                                <button className="mod-btn" style={{ borderColor: "rgba(192, 132, 252, 0.5)", color: "#c084fc", marginTop: "10px" }} onClick={handleCreateRarity}>Forge Rarity Level</button>
                            </div>

                            {rarities.length > 0 && (
                                <div style={{ marginTop: "30px", display: "grid", gap: "10px", gridTemplateColumns: "1fr 1fr" }}>
                                    {rarities.map(r => (
                                        <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", border: `1px solid ${r.color_hex}`, padding: "10px 15px", borderRadius: "3px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <div style={{ color: "#d4af37", fontSize: "0.8rem", width: "15px" }}>[{r.tier}]</div>
                                                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: r.color_hex, boxShadow: `0 0 10px ${r.color_hex}` }}></div>
                                                <span style={{ color: "#e5e5e5", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "1px" }}>{r.name}</span>
                                            </div>
                                            <button onClick={() => handleDeleteRarity(r.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}>✖</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {view === "gallery" && (
                    <div className="mod-catalogue" style={{ marginTop: 0 }}>
                        <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            LIVE SYSTEM DATABASE
                            <span style={{ fontSize: "0.6rem", color: "#888", letterSpacing: "1px" }}>*CLICK ARTIFACTS TO ENTER EDIT MODE</span>
                        </h3>
                        
                        {stats && (
                            <div className="mod-stats-banner">
                                <div>Active Collectors <span>{stats.fans}</span></div>
                                <div>Total Artifacts <span>{stats.items}</span></div>
                                <div>Active Categories <span>{tags.length}</span></div>
                            </div>
                        )}

                        <div style={{ display: "flex", gap: "30px", marginBottom: "40px", paddingBottom: "25px", borderBottom: "1px dashed rgba(255,255,255,0.05)" }}>
                            <select className="mod-select" style={{ margin: 0 }} value={filterRarity} onChange={e => setFilterRarity(e.target.value)}>
                                <option value="">All Rarities</option>
                                {rarities.map(r => <option key={r.id} value={r.name}>{r.name.toUpperCase()}</option>)}
                            </select>
                            <select className="mod-select" style={{ margin: 0 }} value={filterTag} onChange={e => setFilterTag(e.target.value)}>
                                <option value="">All Categories</option>
                                {tags.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                            </select>
                        </div>

                        <div className="mod-grid">
                            {filteredItems.map(i => (
                                <div 
                                    key={i.id} 
                                    onClick={() => handleEditItemClick(i)} 
                                    style={{ cursor: "pointer", transition: "transform 0.2s" }} 
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"} 
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                >
                                    <ItemCard item={i} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === "identity" && (
                    <div className="mod-panel" style={{ marginTop: 0 }}>
                        <h3>MUSEUM IDENTITY</h3>
                        
                        <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "30px", letterSpacing: "1px" }}>
                            Modify the global namesake and narrative of the collection. This metadata is projected across all public and collector terminals.
                        </p>

                        <label style={{ display: "block", color: "#14b8a6", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px" }}>Collection Title</label>
                        <input
                            className="mod-input"
                            placeholder="TITLE"
                            value={collectionName}
                            onChange={(e) => setCollectionName(e.target.value)}
                        />

                        <label style={{ display: "block", color: "#14b8a6", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px" }}>Museum Description</label>
                        <input
                            className="mod-input"
                            placeholder="DESCRIPTION"
                            value={collectionDesc}
                            onChange={(e) => setCollectionDesc(e.target.value)}
                        />

                        <button className="mod-btn" onClick={handleSaveCollectionInfo} style={{ marginTop: "20px" }}>Publish Identity Overrides</button>
                    </div>
                )}

                {view === "trophies" && (
                    <>
                        <div className="mod-panel" style={{ border: "1px solid rgba(168, 85, 247, 0.3)" }}>
                            <h3 style={{ color: "#c084fc", borderBottom: "1px solid rgba(168, 85, 247, 0.2)" }}>Forging Rulesets</h3>
                            
                            <input className="mod-input" placeholder="TROPHY NAME (e.g. My First Artifact)" value={achName} onChange={(e) => setAchName(e.target.value)} />
                            <input className="mod-input" placeholder="DESCRIPTION (e.g. Find one item in the vault)" value={achDesc} onChange={(e) => setAchDesc(e.target.value)} />
                            
                            <div style={{ display: "flex", gap: "10px" }}>
                                <select className="mod-select" style={{ flex: 1 }} value={achType} onChange={(e) => { setAchType(e.target.value); setAchExtra(""); }}>
                                    <option value="total_items">Acquisition Threshold (Total Count)</option>
                                    <option value="progress">Vault Completion (Percentage)</option>
                                    <option value="rarity">Specialized Hunt (By Rarity)</option>
                                    <option value="tag">Category Mastery (By Category)</option>
                                </select>
                                <input className="mod-input" type="number" style={{ flex: 0.5, margin: 0 }} placeholder="Qty (-1 = All)" value={achValue} onChange={(e) => setAchValue(e.target.value)} />
                            </div>

                            {achType === "rarity" && (
                                <select className="mod-select" value={achExtra} onChange={(e) => setAchExtra(e.target.value)}>
                                    <option value="">Select Target Rarity...</option>
                                    {rarities.map(r => <option key={r.id} value={r.name}>{r.name.toUpperCase()}</option>)}
                                </select>
                            )}

                            {achType === "tag" && (
                                <select className="mod-select" value={achExtra} onChange={(e) => setAchExtra(e.target.value)}>
                                    <option value="">Select Target Category...</option>
                                    {tags.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                </select>
                            )}

                            <button className="mod-btn" onClick={handleCreateTrophy} style={{ color: "#c084fc", borderColor: "rgba(168, 85, 247, 0.4)", marginTop: "20px" }}>Compile Milestone</button>
                        </div>

                        {achievements.length > 0 && (
                            <div className="mod-panel" style={{ marginTop: "30px", background: "transparent", border: "none", boxShadow: "none", padding: 0 }}>
                                <h4 style={{ color: "#888", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "15px" }}>Active System Milestones</h4>
                                <div className="mod-grid">
                                    {achievements.map(a => (
                                        <div key={a.id} style={{ background: "rgba(26, 21, 20, 0.9)", padding: "20px", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "2px", position: "relative" }}>
                                            <button onClick={() => handleDeleteTrophy(a.id)} style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}>✖</button>
                                            <h4 style={{ color: "#d4af37", margin: "0 0 5px 0", fontFamily: "'Playfair Display', serif" }}>{a.name}</h4>
                                            <p style={{ color: "#a39171", fontSize: "0.8rem", margin: "0 0 10px 0" }}>{a.description}</p>
                                            <div style={{ fontSize: "0.7rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>
                                                Rule: {a.condition_type} [{a.condition_value}] {a.condition_extra}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default ModeratorView;