import { useState, useEffect } from "react";
import "./CardList.scss";
import events from "../data/events";

function getCardsPerPage() {
  if (window.innerWidth <= 700) return 2;
  if (window.innerWidth <= 1100) return 3;
  return 4;
}

export default function CardList({ data = events, onCardClick }) {
  const [page, setPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());

  useEffect(() => {
    function handleResize() {
      setCardsPerPage(getCardsPerPage());
      setPage(0); // Remet à zéro quand on change de taille
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pageCount = Math.ceil(data.length / cardsPerPage);

  const pageData = data.slice(page * cardsPerPage, (page + 1) * cardsPerPage);

  function gotoPage(idx) {
    setPage(idx);
  }

  return (
    <div className="cardlist-outer">
      <div className="cardlist-arrows">
        <button
          className="arrow-btn"
          onClick={() => setPage(page > 0 ? page - 1 : pageCount - 1)}
          aria-label="Page précédente"
        >
          ◀
        </button>
        <div className="cards">
          {pageData.map((item, i) => (
            <div
              className="card"
              key={i}
              onClick={() => onCardClick && onCardClick(page * cardsPerPage + i)}
              style={{ cursor: "pointer" }}
            >
              <h4>{item.title}</h4>
              <div className="country">{item.country}</div>
              <div className="type">{item.type}</div>
              <div className="year">{item.year}</div>
              <div className={`status status-${item.status.replace(/ /g, '').toLowerCase()}`}>{item.status}</div>
            </div>
          ))}
        </div>
        <button
          className="arrow-btn"
          onClick={() => setPage(page < pageCount - 1 ? page + 1 : 0)}
          aria-label="Page suivante"
        >
          ▶
        </button>
      </div>
      <div className="cardlist-dots">
        {Array(pageCount)
          .fill()
          .map((_, idx) => (
            <button
              key={idx}
              className={`dot${idx === page ? " active" : ""}`}
              onClick={() => gotoPage(idx)}
              aria-label={`Page ${idx + 1}`}
            />
          ))}
      </div>
    </div>
  );
}