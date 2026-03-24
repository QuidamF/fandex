import ProgressBar from "./ProgressBar";

function HomeView({ progress }) {
    if (!progress) return null;

    return (
        <div>
            <h3 style={{ paddingLeft: "15px" }}>Overall Progress</h3>
            <div style={{ padding: "0 15px" }}>
                <ProgressBar progress={progress} />
            </div>
        </div>
    );
}

export default HomeView;