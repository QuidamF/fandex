import React from "react";
import ItemCard from "../shared/ItemCard";

function ModStudio({ 
    editItemId, 
    name, 
    setName, 
    rarity, 
    setRarity, 
    tag, 
    setTag, 
    description, 
    setDescription, 
    image, 
    handleFile, 
    fileInputRef, 
    handleSaveItem, 
    handleClearForm, 
    handleDeleteItem, 
    tags, 
    rarities 
}) {
    return (
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

            <div className="mod-minting-grid">
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
    );
}

export default ModStudio;
