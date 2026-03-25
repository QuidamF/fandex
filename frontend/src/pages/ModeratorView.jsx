import { useState, useEffect } from "react";
import { createItem, getTags, createTag, getItems, getStats } from "../services/api";
import ItemCard from "../components/ItemCard";
import "./ModeratorView.css";

function ModeratorView({ user, onLogout }) {
    const [view, setView] = useState("minting");

    const [name, setName] = useState("");
    const [rarity, setRarity] = useState("common");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [newTag, setNewTag] = useState("");
    const [image, setImage] = useState("");

    // data
    const [tags, setTags] = useState([]);
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState(null);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (view === "minting") {
            getTags().then(setTags);
        } else if (view === "gallery") {
            getItems().then(setItems);
            getStats().then(setStats);
            getTags().then(setTags);
        }
    }, [view]);

    const handleCreateItem = async () => {
        if (!tag) {
            alert("Select a tag");
            return;
        }

        const res = await createItem({
            name,
            rarity,
            tags: [tag],
            description,
            image
        });

        if (res.status) {
            alert("Artifact successfully catalogued!");
            setName("");
            setTag("");
            setDescription("");
            setImage("");
        } else {
            alert(res.message);
        }
    };

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
                        className="mod-tab" 
                        onClick={onLogout}
                        style={{ color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", padding: "5px 15px", borderRadius: "2px", marginLeft: "10px" }}
                    >Disconnect
                    </button>
                </nav>
            </header>

            <main className="mod-content" style={view === "gallery" ? { display: "block" } : {}}>
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
                        </div>

                        {/* 🟡 CREATE ITEM */}
                        <div className="mod-panel" style={{ border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                            <h3 style={{ color: "#d4af37", borderBottom: "1px solid rgba(212, 175, 55, 0.2)" }}>Index New Artifact</h3>

                            <input
                                className="mod-input"
                                placeholder="ARTIFACT NAME"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <select className="mod-select" value={rarity} onChange={(e) => setRarity(e.target.value)}>
                                <option value="common">Common</option>
                                <option value="rare">Rare</option>
                                <option value="legendary">Legendary</option>
                            </select>

                            <select className="mod-select" value={tag} onChange={(e) => setTag(e.target.value)}>
                                <option value="">Select Category...</option>
                                {tags.map(t => (
                                    <option key={t.id} value={t.name}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                className="mod-input"
                                placeholder="ARTIFACT DESCRIPTION"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <input className="mod-file" type="file" onChange={handleFile} accept="image/*" />
                            
                            {image && <img src={image} alt="preview" className="mod-preview" />}

                            <button className="mod-btn" onClick={handleCreateItem} style={{ color: "#d4af37", borderColor: "rgba(212, 175, 55, 0.4)" }}>
                                Mint Artifact
                            </button>
                        </div>
                    </>
                )}

                {view === "gallery" && (
                    {/* 🔵 LIVE CATALOGUE PREVIEW */}
                    <div className="mod-catalogue" style={{ marginTop: 0 }}>
                        <h3>LIVE SYSTEM DATABASE</h3>
                        
                        {stats && (
                            <div className="mod-stats-banner">
                                <div>Active Collectors <span>{stats.fans}</span></div>
                                <div>Total Artifacts <span>{stats.items}</span></div>
                                <div>Active Categories <span>{tags.length}</span></div>
                            </div>
                        )}

                        <div className="mod-grid">
                            {items.map(i => (
                                <ItemCard key={i.id} item={i} />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ModeratorView;