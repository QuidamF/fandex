import React from "react";

/**
 * StatBanner component renders a set of metrics in a standardized layout.
 * @param {Object} stats - Object containing metric labels and values.
 * @param {string} className - Optional CSS class for the container.
 * @param {Object} styles - Optional inline styles for the container.
 */
function StatBanner({ stats, className = "shared-stats-banner", styles = {} }) {
    if (!stats || Object.keys(stats).length === 0) return null;

    return (
        <div className={className} style={{ 
            display: "flex", 
            gap: "20px", 
            justifyContent: "space-around",
            padding: "20px", 
            background: "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "4px",
            marginBottom: "30px",
            ...styles 
        }}>
            {Object.entries(stats).map(([label, value]) => (
                <div key={label} style={{ textAlign: "center" }}>
                    <h3 style={{ margin: "0 0 5px 0", color: "#d4af37", fontSize: "1.5rem" }}>{value}</h3>
                    <p style={{ margin: 0, color: "#888", fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase" }}>{label}</p>
                </div>
            ))}
        </div>
    );
}

export default StatBanner;
