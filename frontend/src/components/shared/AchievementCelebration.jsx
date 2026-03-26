import { useEffect, useState } from "react";
import "./AchievementCelebration.css";

function AchievementCelebration({ achievements, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Auto-close or auto-advance after 5 seconds
        const timer = setTimeout(() => {
            if (currentIndex < achievements.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                onClose();
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentIndex, achievements, onClose]);

    const handleNext = () => {
        if (currentIndex < achievements.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose();
        }
    };

    const ach = achievements[currentIndex];
    if (!ach) return null;

    return (
        <div className="celebration-overlay" onClick={handleNext}>
            <div key={ach.id} className="celebration-content" onClick={e => e.stopPropagation()}>
                <div className="celebration-rays"></div>
                <div className="celebration-badge">
                    <span className="trophy-icon">🏆</span>
                </div>
                
                <h4 className="celebration-kicker">MILESTONE UNLOCKED</h4>
                <h2 className="celebration-title">{ach.name}</h2>
                <p className="celebration-desc">{ach.description}</p>
                
                <button className="celebration-btn" onClick={handleNext}>
                    {currentIndex < achievements.length - 1 ? "Next Milestone ➔" : "Continue"}
                </button>
            </div>
        </div>
    );
}

export default AchievementCelebration;
