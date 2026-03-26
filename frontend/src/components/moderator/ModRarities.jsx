import React from "react";

function ModRarities({ newRarityName, setNewRarityName, newRarityTier, setNewRarityTier, newRarityColor, setNewRarityColor, handleCreateRarity, rarities, handleDeleteRarity }) {
    return (
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
    );
}

export default ModRarities;
