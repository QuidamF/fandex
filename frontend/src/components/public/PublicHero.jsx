import React from "react";

function PublicHero({ collectionInfo, onEnter }) {
    return (
        <header className="hero-section">
            <h1 className="hero-title">{collectionInfo.name}</h1>
            <p className="hero-subtitle">
                {collectionInfo.description}
            </p>
            <button 
                className="hero-btn"
                onClick={onEnter}
            >
                Enter Private Vault
            </button>
        </header>
    );
}

export default PublicHero;
