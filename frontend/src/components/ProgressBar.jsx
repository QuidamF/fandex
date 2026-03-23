import "./ProgressBar.css";

function ProgressBar({ progress }) {
    return (
        <div className="progress-container">
            <div
                className="progress-bar"
                style={{ width: `${progress.percentage}%` }}
            />
            <span>
                {progress.collected} / {progress.total}
            </span>
        </div>
    );
}

export default ProgressBar;