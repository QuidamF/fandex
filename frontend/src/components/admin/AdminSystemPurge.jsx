import React from "react";

function AdminSystemPurge({ handlePurge }) {
    return (
        <div className="admin-panel" style={{ border: "1px solid rgba(239, 68, 68, 0.2)", marginTop: "40px" }}>
            <h3 style={{ color: "#ef4444", borderBottom: "none", margin: "0 0 15px 0" }}>DANGER ZONE</h3>
            <p style={{ color: "#a0a0a0", fontSize: "0.85rem", marginBottom: "20px", lineHeight: "1.5" }}>
                Initialize a complete database wipe. This targets and truncates all Artifacts, Categories, Milestones, Fans, and Curators. The core Museum identity and Root Admin access will be spared.
            </p>
            <button 
                style={{ 
                    width: "100%", padding: "12px", background: "rgba(239, 68, 68, 0.05)", 
                    border: "1px solid rgba(239, 68, 68, 0.4)", color: "#ef4444", 
                    textTransform: "uppercase", letterSpacing: "3px", cursor: "pointer", transition: "0.3s" 
                }} 
                onMouseEnter={(e) => { e.target.style.background="rgba(239,68,68,0.2)"; e.target.style.boxShadow="0 0 15px rgba(239,68,68,0.3)"; }}
                onMouseLeave={(e) => { e.target.style.background="rgba(239,68,68,0.05)"; e.target.style.boxShadow="none"; }}
                onClick={handlePurge}
            >
                EXECUTE SYSTEM PURGE
            </button>
        </div>
    );
}

export default AdminSystemPurge;
