import { useState, useEffect } from "react";
import QuoteCard from "./components/QuoteCard";
import Buttons from "./components/Buttons";
import LikedQuotes from "./components/LikedQuotes";
import "./App.css";

function App() {

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [likedQuotes, setLikedQuotes] = useState([]);

  // Load liked quotes from localStorage when app starts
  useEffect(() => {
    const savedQuotes = JSON.parse(localStorage.getItem("likedQuotes"));
    if (savedQuotes) {
      setLikedQuotes(savedQuotes);
    }
  }, []);

  // Save liked quotes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("likedQuotes", JSON.stringify(likedQuotes));
  }, [likedQuotes]);

  // Fetch quote from API
  const fetchQuote = async () => {
    setLoading(true);

    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();

      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }

    setLoading(false);
  };

  // Fetch first quote when component mounts
  useEffect(() => {
    fetchQuote();
  }, []);

  // Toggle Like / Unlike
  const toggleLike = () => {

    const alreadyLiked = likedQuotes.find(
      (item) => item.quote === quote
    );

    if (alreadyLiked) {

      const updatedQuotes = likedQuotes.filter(
        (item) => item.quote !== quote
      );

      setLikedQuotes(updatedQuotes);

    } else {

      const newQuote = {
        quote: quote,
        author: author
      };

      setLikedQuotes([...likedQuotes, newQuote]);

    }
  };

  // Copy quote to clipboard
  const copyQuote = () => {
    navigator.clipboard.writeText(`${quote} — ${author}`);
    alert("Quote copied!");
  };

  // Check if current quote is liked
  const isLiked = likedQuotes.find(
    (item) => item.quote === quote
  );

  return (
    <div className="app">

      {/* Background Shapes */}
      <div className="shape1"></div>
      <div className="shape2"></div>

      <h1>Motivation Dashboard</h1>

      <p className="likedCount">
        ❤️ Total Liked: {likedQuotes.length}
      </p>

      <QuoteCard
        quote={quote}
        author={author}
        loading={loading}
      />

      <Buttons
        fetchQuote={fetchQuote}
        toggleLike={toggleLike}
        copyQuote={copyQuote}
        loading={loading}
        isLiked={isLiked}
      />

      <LikedQuotes likedQuotes={likedQuotes} />

    </div>
  );
}

export default App;