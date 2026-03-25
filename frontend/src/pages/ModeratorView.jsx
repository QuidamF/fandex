import { useState, useEffect } from "react";
import { createItem, getTags, createTag, getItems, getStats, updateItem, deleteItem, deleteTag, getCollectionInfo, updateCollectionInfo } from "../services/api";
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

    const [newTag, setNewTag] = useState("");

    const [tags, setTags] = useState([]);
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState(null);

    // identity
    const [collectionName, setCollectionName] = useState("");
    const [collectionDesc, setCollectionDesc] = useState("");

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (view === "minting") {
            getTags().then(setTags);
        } else if (view === "gallery") {
            getItems().then(setItems);
            getStats().then(setStats);
            getTags().then(setTags);
        } else if (view === "identity") {
            getCollectionInfo().then(res => {
                if (res.status) {
                    setCollectionName(res.data.name);
                    setCollectionDesc(res.data.description);
                }
            });
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
            handleCancelEdit();
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
            handleCancelEdit();
        } else {
            alert(res.message);
        }
    };

    const handleEditItemClick = (item) => {
        setEditItemId(item.id);
        setName(item.name);
        setRarity(item.rarity);
        setDescription(item.description || "");
        setImage(item.image || "");
        setTag(item.tags.length > 0 ? item.tags[0] : "");
        setView("minting");
    };

    const handleCancelEdit = () => {
        setEditItemId(null);
        setName("");
        setRarity("common");
        setDescription("");
        setImage("");
        setTag("");
        setView("gallery");
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
                        className="mod-tab" 
                        onClick={onLogout}
                        style={{ color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", padding: "5px 15px", borderRadius: "2px", marginLeft: "10px" }}
                    >Disconnect
                    </button>
                </nav>
            </header>

            <main className="mod-content" style={view === "gallery" || view === "identity" ? { display: "block" } : {}}>
                {view === "minting" && (
                    <>
                        {/* 🟣 CREATE TAG */}
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

                        {/* 🟡 CREATE/EDIT ITEM */}
                        <div className="mod-panel" style={{ border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                            <h3 style={{ color: "#d4af37", borderBottom: "1px solid rgba(212, 175, 55, 0.2)" }}>{editItemId ? "Modify Artifact" : "Index New Artifact"}</h3>
                            <input className="mod-input" placeholder="ARTIFACT NAME" value={name} onChange={(e) => setName(e.target.value)} />
                            <select className="mod-select" value={rarity} onChange={(e) => setRarity(e.target.value)}>
                                <option value="common">Common</option>
                                <option value="rare">Rare</option>
                                <option value="legendary">Legendary</option>
                            </select>
                            <select className="mod-select" value={tag} onChange={(e) => setTag(e.target.value)}>
                                <option value="">Select Category...</option>
                                {tags.map(t => (
                                    <option key={t.id} value={t.name}>{t.name}</option>
                                ))}
                            </select>

                            <input className="mod-input" placeholder="ARTIFACT DESCRIPTION" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <input className="mod-file" type="file" onChange={handleFile} accept="image/*" />
                            {image && <img src={image} alt="preview" className="mod-preview" />}
                            
                            <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                                <button className="mod-btn" onClick={handleSaveItem} style={{ color: "#d4af37", borderColor: "rgba(212, 175, 55, 0.4)", flex: 1 }}>
                                    {editItemId ? "Update Artifact" : "Mint Artifact"}
                                </button>
                                {editItemId && (
                                    <>
                                        <button className="mod-btn" onClick={handleCancelEdit} style={{ color: "#888", borderColor: "rgba(255,255,255,0.2)", flex: 0.4 }}>Cancel</button>
                                        <button className="mod-btn" onClick={handleDeleteItem} style={{ color: "#ef4444", borderColor: "rgba(239, 68, 68, 0.4)", flex: 0.4 }}>Destroy</button>
                                    </>
                                )}
                            </div>
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

                        <div className="mod-grid">
                            {items.map(i => (
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
            </main>
        </div>
    );
}

export default ModeratorView;