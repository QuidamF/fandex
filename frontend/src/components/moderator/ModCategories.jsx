import React from "react";

function ModCategories({ newTag, setNewTag, handleCreateTag, tags, handleDeleteTag }) {
    return (
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
                                <button 
                                    onClick={() => handleDeleteTag(t.id)} 
                                    style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.75rem", textTransform: "uppercase", transition: "0.3s" }} 
                                    onMouseEnter={(e) => e.target.style.textShadow = "0 0 5px red"} 
                                    onMouseLeave={(e) => e.target.style.textShadow = "none"}
                                >[ Scrap ]</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ModCategories;
