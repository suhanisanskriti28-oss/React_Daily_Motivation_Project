import "./SavedQuotes.css";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

function SavedQuotes({ likedQuotes, clearLiked }) {

  const [isClearing, setIsClearing] = useState(false); // ✅ MOVE HERE

  return (
    <div className="saved-panel">

      {likedQuotes.length > 0 && (
        <button
          className={`clear-btn ${isClearing ? "clearing" : ""}`}
          onClick={() => {
            setIsClearing(true);

            setTimeout(() => {
              clearLiked();
              setIsClearing(false);
            }, 300);
          }}
          data-label="Clear All"
        >
          <FaTrash /> {/* optional but nicer */}
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