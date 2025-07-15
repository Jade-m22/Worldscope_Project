import { useState, useEffect } from "react";
import events from "../data/events";
import FlagOrEmoji from "../utils/FlagOrEmoji";
import countryToCode from "../utils/countryCodes";
import { fetchWikiExtract } from "../utils/wiki";

export default function CardList({ data = events, onCardClick, onShowDetail }) {
  const [visibleCount, setVisibleCount] = useState(10);
  const [wikiImages, setWikiImages] = useState({});

  const visibleData = data.slice(0, visibleCount);

  useEffect(() => {
    visibleData.forEach((item) => {
      if (!wikiImages[item.title]) {
        fetchWikiExtract(item.title).then((res) => {
          if (res?.image) {
            setWikiImages((prev) => ({ ...prev, [item.title]: res.image }));
          }
        });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleData]);

  return (
    <div className="cardlist-outer">
      <div className="cards">
        {visibleData.map((item, i) => {
          const imageUrl = wikiImages[item.title];
          return (
            <div
              className="card"
              key={i}
              onClick={() => onCardClick && onCardClick(i)}
              style={{
                "--bg-url": imageUrl ? `url(${imageUrl})` : "none",
              }}
              tabIndex={0}
              role="button"
              aria-pressed="false"
            >
              <div className="card-overlay">
                <h4 className="card-title">
                  <FlagOrEmoji code={countryToCode[item.country]} size="1.2em" />
                  {item.title}
                </h4>
                <div className="card-details">
                  <div className="country">{item.country}</div>
                  <div className="type">{item.subcategory || item.type}</div>
                  <div className="year">{item.year}</div>
                  <div
                    className={`status status-${item.status.replace(/ /g, "").toLowerCase()}`}
                  >
                    {item.status}
                  </div>
                  {onShowDetail && (
                    <button
                      className="card-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowDetail(i);
                      }}
                    >
                      <span className="text">Voir</span>
                      <span className="icon">+</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {visibleCount < data.length && (
          <div className="show-more-wrapper">
            <button
              className="show-more-btn"
              onClick={() => setVisibleCount(visibleCount + 10)}
            >
              + Voir plus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
