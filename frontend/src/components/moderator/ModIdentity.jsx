import React from "react";

function ModIdentity({ 
    collectionName, 
    setCollectionName, 
    collectionDesc, 
    setCollectionDesc, 
    handleSaveCollectionInfo 
}) {
    return (
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
    );
}

export default ModIdentity;
