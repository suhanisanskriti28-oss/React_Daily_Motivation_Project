function Buttons({ fetchQuote, toggleLike, copyQuote, loading, isLiked }) {

  return (
    <div className="buttons">

      <button onClick={fetchQuote} disabled={loading}>
        🔄 New Quote
      </button>

      <button onClick={toggleLike}>
        {isLiked ? "💔 Unlike" : "❤️ Like"}
      </button>

      <button onClick={copyQuote}>
        📋 Copy
      </button>

    </div>
  );
}

export default Buttons;