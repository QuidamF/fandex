import React from "react";

function ModTrophies({ 
    achName, 
    setAchName, 
    achDesc, 
    setAchDesc, 
    achType, 
    setAchType, 
    setAchExtra, 
    achValue, 
    setAchValue, 
    achExtra, 
    rarities, 
    tags, 
    handleCreateTrophy, 
    achievements, 
    handleDeleteTrophy 
}) {
    return (
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
    );
}

export default ModTrophies;
