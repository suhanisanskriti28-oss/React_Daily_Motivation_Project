import "./SavedQuotes.css";
import { FaTrash } from "react-icons/fa";

function SavedQuotes({ likedQuotes, clearLiked }) {
    return (
        <div className="saved-panel">

            {likedQuotes.length > 0 && (
                <button
                    className="clear-btn"
                    onClick={clearLiked}
                    data-label="Clear All"
                >
                    <FaTrash />
                </button>
            )}

            <div className="saved-list">
                {likedQuotes.slice(0, 5).map((item, index) => (
                    <div key={index} className="saved-quote">
                        <p>“{item.quote}”</p>
                        <span>— {item.author}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default SavedQuotes;