import ProgressBar from "./ProgressBar";

function HomeView({ progress, progressByTag }) {
    if (!progress) return null;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Overview</h2>
            <div style={{ marginBottom: "30px" }}>
                <ProgressBar progress={progress} />
            </div>

            <h3>By Category</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
                {progressByTag?.map(t => (
                    <div key={t.tag} style={{
                        background: "#1e293b",
                        padding: "15px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                    }}>
                        <p style={{ margin: "0 0 10px 0", fontWeight: "bold", textTransform: "capitalize" }}>{t.tag}</p>
                        <ProgressBar progress={t} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeView;