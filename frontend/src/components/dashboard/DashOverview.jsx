import React from "react";
import ProgressBar from "../ProgressBar";

function DashOverview({ progress, progressByTag }) {
    if (!progress) return null;

    return (
        <div>
            <div style={{ marginBottom: "40px", padding: "20px", background: "#1a1514", border: "1px solid rgba(212, 175, 55, 0.2)", borderRadius: "2px" }}>
                <ProgressBar progress={progress} />
            </div>

            <h3 style={{fontFamily: "Playfair Display, serif", color: "#d4af37", letterSpacing: "2px", fontWeight:"300"}}>BY CATEGORY</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
                {progressByTag?.map(t => (
                    <div key={t.tag} style={{
                        background: "#1a1514",
                        padding: "20px",
                        borderRadius: "2px",
                        border: "1px solid rgba(212, 175, 55, 0.15)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
                    }}>
                        <p style={{ margin: "0 0 10px 0", fontWeight: "bold", textTransform: "capitalize" }}>{t.tag}</p>
                        <ProgressBar progress={t} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashOverview;
