import "./ItemModal.css";

function ItemModal({ item, onClose, onCollect }) {
    if (!item) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content ${item.collected ? "collected" : ""}`} style={{ "--rarity-color": item.rarity_color || "#9ca3af" }} onClick={(e) => e.stopPropagation()}>
                
                <div className="modal-bg"></div>

                <div className="modal-inner-content">
                    <button className="close-btn" onClick={onClose}>✖</button>

                    {item.has_image && (
                        <div style={{ background: "rgba(0,0,0,0.5)", borderRadius: "4px", padding: "10px", margin: "10px 0" }}>
                            <img src={`http://localhost:5000${item.image_url}`} alt={item.name} style={{ width: "100%", maxHeight: "500px", objectFit: "contain", borderRadius: "2px" }} />
                        </div>
                    )}

                    <h2 style={{ color: item.rarity_color || "#e5e5e5" }}>{item.name}</h2>
                    <div style={{ height: "1px", background: item.rarity_color || "rgba(255,255,255,0.1)", margin: "15px 0", opacity: 0.5, boxShadow: `0 0 5px ${item.rarity_color || "transparent"}` }}></div>
                    <p><strong style={{ color: item.rarity_color || "#9ca3af", letterSpacing: "2px", marginRight: "10px"}}>RARITY:</strong> <span style={{ color: item.rarity_color || "#e5e5e5" }}>{item.rarity.toUpperCase()}</span></p>
                    <p>{item.description || "No description"}</p>

                    <button onClick={() => onCollect(item.id)}>
                        {item.collected ? "Collected" : "Collect"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ItemModal;