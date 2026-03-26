import React from "react";

function DashHero({ collectionInfo }) {
    return (
        <div className="dashboard-hero">
            <h1>{collectionInfo.name}</h1>
            <p>{collectionInfo.description}</p>
        </div>
    );
}

export default DashHero;
