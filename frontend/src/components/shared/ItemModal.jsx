import { BASE_URL } from "../../services/api";
import "./ItemModal.css";

function ItemModal({ item, onClose, onCollect, onEdit }) {
    React.useEffect(() => {
        if (item) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [item]);

    if (!item) return null;

    const imageUrl = item.id === "preview" 
        ? item.image 
        : (item.image_url ? `${BASE_URL}${item.image_url}` : null);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content ${item.collected ? "collected" : ""}`} style={{ "--rarity-color": item.rarity_color || "#9ca3af" }} onClick={(e) => e.stopPropagation()}>
                
                <div className="modal-bg"></div>

                <div className="modal-inner-content">
                    <button className="close-btn" onClick={onClose}>✖</button>

                    {imageUrl && (
                        <div style={{ 
                            background: "#000", 
                            borderRadius: "4px", 
                            margin: "10px 0", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.1)"
                        }}>
                            <img 
                                src={imageUrl} 
                                alt={item.name} 
                                style={{ 
                                    width: "100%", 
                                    maxHeight: "40vh", 
                                    objectFit: "contain" 
                                }} 
                            />
                        </div>
                    )}

                    <h2 style={{ color: item.rarity_color || "#e5e5e5" }}>{item.name}</h2>
                    <div style={{ height: "1px", background: item.rarity_color || "rgba(255,255,255,0.1)", margin: "15px 0", opacity: 0.5, boxShadow: `0 0 5px ${item.rarity_color || "transparent"}` }}></div>
                    <p><strong style={{ color: item.rarity_color || "#9ca3af", letterSpacing: "2px", marginRight: "10px"}}>RARITY:</strong> <span style={{ color: item.rarity_color || "#e5e5e5" }}>{item.rarity.toUpperCase()}</span></p>
                    
                    <div style={{ maxHeight: "150px", overflowY: "auto", margin: "15px 0", padding: "0 10px", textAlign: "left" }}>
                        <p style={{ margin: 0 }}>{item.description || "No description available for this artifact."}</p>
                    </div>

                    <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                        {onCollect && (
                            <button onClick={() => onCollect(item.id)} style={{ flex: 1, margin: 0 }}>
                                {item.collected ? "Collected" : "Collect Artifact"}
                            </button>
                        )}
                        
                        {onEdit && (
                            <button onClick={() => { onEdit(item); onClose(); }} style={{ flex: 1, margin: 0, color: "var(--color-teal)", borderColor: "rgba(20, 184, 166, 0.4)" }}>
                                Edit Meta
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ItemModal;