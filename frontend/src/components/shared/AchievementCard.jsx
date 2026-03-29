import React from "react";

/**
 * AchievementCard component renders a single achievement milestone in a standardized way.
 */
function AchievementCard({ 
    achievement, 
    onDelete, 
    showCondition = false, 
    className = "shared-achievement-card" 
}) {
    return (
        <div className={className} style={{ 
            background: "rgba(26, 21, 20, 0.9)", 
            padding: "20px", 
            border: "1px solid rgba(255,255,255,0.05)", 
            borderRadius: "2px", 
            position: "relative",
            minHeight: "100px"
        }}>
            {onDelete && (
                <button 
                    onClick={() => onDelete(achievement.id)} 
                    style={{ 
                        position: "absolute", 
                        top: "10px", 
                        right: "10px", 
                        background: "none", 
                        border: "none", 
                        color: "#ef4444", 
                        cursor: "pointer",
                        fontSize: "1.2rem"
                    }}
                >
                    ✖
                </button>
            )}
            
            <h4 style={{ 
                color: "#d4af37", 
                margin: "0 0 5px 0", 
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                paddingRight: "30px"
            }}>
                🏆 {achievement.name}
            </h4>
            
            <p style={{ 
                color: "#a39171", 
                fontSize: "0.85rem", 
                margin: "0 0 10px 0",
                lineHeight: "1.4"
            }}>
                {achievement.description}
            </p>

            {showCondition && (
                <div style={{ 
                    fontSize: "0.7rem", 
                    color: "#888", 
                    textTransform: "uppercase", 
                    letterSpacing: "1px",
                    borderTop: "1px solid rgba(255,255,255,0.03)",
                    paddingTop: "8px"
                }}>
                    Rule: {achievement.condition_type} [{achievement.condition_value}] {achievement.condition_extra}
                </div>
            )}
        </div>
    );
}

export default AchievementCard;
