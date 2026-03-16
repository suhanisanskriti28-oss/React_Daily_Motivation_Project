function LikedQuotes({ likedQuotes }) {

  if (likedQuotes.length === 0) return null;

  return (

    <div className="likedSection">

      <h2>Your Collection</h2>

      {likedQuotes.map((q, index) => (

        <div key={index} className="likedItem">

          <p>"{q.quote}"</p>

          <span>— {q.author}</span>

        </div>

      ))}

    </div>

  );
}

export default LikedQuotes;