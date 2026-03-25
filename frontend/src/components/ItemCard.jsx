import { useState, useEffect, useRef } from "react";
import "./ItemCard.css";

function ItemCard({ item, onCollect, onClick }) {
    const [loaded, setLoaded] = useState(!item.has_image);
    const [inView, setInView] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setInView(entry.isIntersecting);
        }, { threshold: 0.15 });

        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    const isVisible = loaded && inView;

    return (
        <div
            ref={cardRef}
            className={`card ${item.collected ? "collected" : ""} ${isVisible ? "visible" : "invisible"}`}
            style={{ "--rarity-color": item.rarity_color || "#9ca3af" }}
            onClick={onClick}
        >
            <div className="card-bg"></div>

            <div className="card-content">
                {item.has_image && (
                    <div style={{ background: "rgba(0,0,0,0.5)", borderRadius: "2px", marginBottom: "10px", padding: "5px" }}>
                        <img 
                            src={item.id === "preview" ? item.image : `http://localhost:5000${item.thumb_url}`} 
                            alt={item.name} 
                            style={{ width: "100%", height: "180px", objectFit: "contain" }} 
                            loading="lazy"
                            onLoad={() => setLoaded(true)}
                        />
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