import { useEffect, useRef, useState } from "react";
import {
  FaSync,
  FaCopy,
  FaCheck,
  FaShareAlt,
  FaHeart,
  FaThumbsDown
} from "react-icons/fa";

import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [fontSize, setFontSize] = useState(40);
  const [liked, setLiked] = useState(null);
  const [copied, setCopied] = useState(false);

  const quoteRef = useRef(null);

  // 🔄 FETCH QUOTE
  const fetchQuote = async () => {
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();

      setQuote(data.quote);
      setAuthor(data.author);

      // reset states
      setLiked(null);
      setCopied(false);
    } catch {
      setQuote("Stay strong. Even silence is progress.");
      setAuthor("Unknown");
    }
  };

  // 📋 COPY (ONLY ONCE)
  const copyQuote = () => {
    if (copied) return;

    navigator.clipboard.writeText(`"${quote}" — ${author}`);
    setCopied(true);
  };

  // 📤 SHARE
  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: "Quote",
        text: `"${quote}" — ${author}`,
      });
    } else {
      alert("Sharing not supported");
    }
  };

  // 🔥 INITIAL LOAD
  useEffect(() => {
    fetchQuote();
  }, []);

  // 🔥 AUTO FONT RESIZE (WIDTH + HEIGHT SAFE)
  useEffect(() => {
    if (!quoteRef.current) return;

    const el = quoteRef.current;
    let size = 20;

    while (size < 200) {
      el.style.fontSize = size + "px";

      const overflow =
        el.scrollHeight > el.clientHeight ||
        el.scrollWidth > el.clientWidth;

      if (overflow) {
        size -= 1;
        break;
      }

      size += 1;
    }

    el.style.fontSize = size + "px";
    setFontSize(size);
  }, [quote]);

  return (
    <div className="app">

      {/* 🎯 MAIN QUOTE */}
      <div className="wrapper">
        <div className="container">
          <p ref={quoteRef} className="quote" style={{ fontSize }}>
            “{quote}”
          </p>
          <p className="author">— {author}</p>
        </div>
      </div>

      {/* ⚡ RIGHT CONTROL PANEL */}
      <div className="controls">

        <button onClick={fetchQuote} data-label="New Quote">
          <FaSync />
        </button>

        <button
          className={copied ? "active" : ""}
          onClick={copyQuote}
          data-label={copied ? "Copied!" : "Copy"}
        >
          {copied ? <FaCheck /> : <FaCopy />}
        </button>

        <button onClick={shareQuote} data-label="Share">
          <FaShareAlt />
        </button>

        <button
          className={liked === true ? "active" : ""}
          onClick={() => setLiked(true)}
          data-label="Like"
        >
          <FaHeart />
        </button>

        <button
          className={liked === false ? "active" : ""}
          onClick={() => setLiked(false)}
          data-label="Dislike"
        >
          <FaThumbsDown />
        </button>

      </div>
    </div>
  );
}

export default App;