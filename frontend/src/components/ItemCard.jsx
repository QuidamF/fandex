import "./ItemCard.css";

function ItemCard({ item, onCollect, onClick }) {
    return (
        <div
            className={`card ${item.collected ? "collected" : ""}`}
            style={{ "--rarity-color": item.rarity_color || "#9ca3af" }}
            onClick={onClick}
        >
            <div className="card-bg"></div>

            <div className="card-content">
                {item.image && (
                    <div style={{ background: "rgba(0,0,0,0.5)", borderRadius: "2px", marginBottom: "10px", padding: "5px" }}>
                        <img src={item.image} alt={item.name} style={{ width: "100%", height: "180px", objectFit: "contain" }} />
                    </div>
                )}
                <h3 style={{ color: item.rarity_color || "#e5e5e5", letterSpacing: "2px" }}>{item.name}</h3>
                <div style={{ height: "1px", background: item.rarity_color || "rgba(255,255,255,0.1)", margin: "10px 0", opacity: 0.5, boxShadow: `0 0 5px ${item.rarity_color || "transparent"}` }}></div>
                <p className="rarity" style={{ color: item.rarity_color || "#9ca3af", fontWeight: "bold" }}>
                    {item.rarity}
                </p>

                {onCollect && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onCollect(item.id);
                        }}
                    >
                        {item.collected ? "Collected" : "Collect"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default ItemCard;