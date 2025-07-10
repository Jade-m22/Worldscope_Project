import { useState, useEffect } from "react";
import "./CardList.scss";
import events from "../data/events";

// Fonction pour déterminer le nombre de cards par page selon la largeur
function getPageSize() {
  if (window.innerWidth < 600) return 1;   // mobile
  if (window.innerWidth < 900) return 2;   // tablette portrait
  if (window.innerWidth < 1200) return 3;  // tablette paysage / petit desktop
  return 4;                                // desktop large
}

const AUTO_ADVANCE_MS = 5000; // 5s

export default function CardList({ data = events, onCardClick }) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    // Redimensionnement adaptatif
    function handleResize() {
      setPageSize(getPageSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const numPages = Math.ceil(data.length / pageSize);

  // Pagination auto
  useEffect(() => {
    setPage(0); // reset la page si pageSize change
    const interval = setInterval(() => {
      setPage(p => (p + 1) % numPages);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [numPages, pageSize]);

  // Cards à afficher à cette page
  const currentCards = data.slice(page * pageSize, (page + 1) * pageSize);

  // Contrôles
  const goTo = idx => setPage(idx);
  const nextPage = () => setPage(p => (p + 1) % numPages);
  const prevPage = () => setPage(p => (p - 1 + numPages) % numPages);

  return (
    <div className="carousel-pages">
      <div className="carousel-cards">
        {currentCards.map((item, i) => (
          <div
            className="card"
            key={i + page * pageSize}
            onClick={() => onCardClick && onCardClick(i + page * pageSize)}
          >
            <h4>{item.title}</h4>
            <div className="country">{item.country}</div>
            <div className="type">{item.type}</div>
            <div className="year">{item.year}</div>
            <div className={`status status-${item.status.replace(/ /g, '').toLowerCase()}`}>{item.status}</div>
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button className="carousel-arrow" onClick={prevPage} aria-label="Précédent">◀</button>
        {Array.from({ length: numPages }).map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot${page === idx ? " active" : ""}`}
            onClick={() => goTo(idx)}
            aria-label={`Aller à la page ${idx + 1}`}
          />
        ))}
        <button className="carousel-arrow" onClick={nextPage} aria-label="Suivant">▶</button>
      </div>
    </div>
  );
}