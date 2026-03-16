function QuoteCard({ quote, author, loading }) {

  if (loading) {
    return <p className="loading">Loading quote...</p>;
  }

  return (

    <div className="playerCard">

      <div className="albumArt">

        <div className="quoteOverlay">
          <p className="quoteText">
            {quote}
          </p>
        </div>

      </div>

      <div className="songInfo">

        <h2 className="songTitle">
          Daily Motivation
        </h2>

        <p className="artistName">
          {author}
        </p>

      </div>

      <div className="progressSection">

        <span>0:01</span>

        <div className="progressBar">
          <div className="progressFill"></div>
        </div>

        <span>3:00</span>

      </div>

      <div className="playerControls">

        <button className="iconBtn">🔀</button>
        <button className="iconBtn">⏮</button>

        <button className="playBtn">
          ▶
        </button>

        <button className="iconBtn">⏭</button>
        <button className="iconBtn">🔁</button>

      </div>

    </div>

  );
}

export default QuoteCard;