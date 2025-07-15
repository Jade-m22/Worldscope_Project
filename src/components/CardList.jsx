import { useState, useEffect } from "react";
import events from "../data/events";
import FlagOrEmoji from "../utils/FlagOrEmoji";
import countryToCode from "../utils/countryCodes";
import { fetchWikiExtract } from "../utils/wiki";

export default function CardList({ data = events, onCardClick, onShowDetail }) {
  const cardsPerPage = 4;
  const [startIndex, setStartIndex] = useState(0);
  const [wikiImages, setWikiImages] = useState({});

  const visibleData = data.slice(startIndex, startIndex + cardsPerPage);

  useEffect(() => {
    const preloadData = data.slice(startIndex, startIndex + cardsPerPage + 10);
    const titlesToFetch = preloadData
      .filter(item => !wikiImages[item.title])
      .map(item => item.title);

    if (titlesToFetch.length === 0) return;

    Promise.all(
      titlesToFetch.map((title) =>
        fetchWikiExtract(title).then((res) => ({ title, image: res?.image }))
      )
    ).then((results) => {
      const newImages = {};
      results.forEach(({ title, image }) => {
        if (image) newImages[title] = image;
      });
      setWikiImages((prev) => ({ ...prev, ...newImages }));
    });
  }, [startIndex, data, wikiImages]);

  const handleShowMore = () => {
    setStartIndex(prev => prev + cardsPerPage);
  };

  return (
    <div className="cardlist-outer">
      <div className="cards">
        {visibleData.map((item, i) => {
          const imageUrl = wikiImages[item.title];
          return (
            <div
              className="card"
              key={item.title}
              onClick={() => onCardClick?.(i + startIndex)}
              style={{ "--bg-url": imageUrl ? `url(${imageUrl})` : "none" }}
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
                  <div className={`status status-${item.status.replace(/ /g, "").toLowerCase()}`}>
                    {item.status}
                  </div>
                  {onShowDetail && (
                    <button
                      className="card-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowDetail(i + startIndex);
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
      </div>

      {startIndex + cardsPerPage < data.length && (
        <div className="show-more-wrapper">
          <button className="show-more-btn" onClick={handleShowMore}>
            + Voir plus
          </button>
        </div>
      )}
    </div>
  );
}
