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
                <h3>{item.name}</h3>
                <p className="rarity" style={{ color: item.rarity_color || "#9ca3af" }}>
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