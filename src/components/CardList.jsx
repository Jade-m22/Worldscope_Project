import { useState, useEffect } from "react";
import events from "../data/events";
import countryToCode from "../utils/countryCodes";
import { fetchWikiExtract } from "../utils/wiki";
import SeeMoreButton from "./SeeMoreButton";
import FlagOrEmoji from "../utils/FlagOrEmoji";

export default function CardList({ data = events, onCardClick, onShowDetail }) {
  const cardsPerPage = 4;
  const [startIndex, setStartIndex] = useState(0);
  const [wikiImages, setWikiImages] = useState({});
  const [loadingTitles, setLoadingTitles] = useState([]);

  const visibleData = data.slice(startIndex, startIndex + cardsPerPage);

  useEffect(() => {
    const preloadData = data.slice(startIndex, startIndex + cardsPerPage);
    const titlesToFetch = preloadData
      .filter(item => !wikiImages[item.title])
      .map(item => item.title);

    if (titlesToFetch.length === 0) return;

    let i = 0;

    function fetchNext() {
      if (i >= titlesToFetch.length) return;

      const title = titlesToFetch[i];
      setLoadingTitles(prev => [...prev, title]);

      fetchWikiExtract(title).then(res => {
        if (res?.image) {
          const img = new Image();
          img.src = res.image;
          img.onload = () => {
            setWikiImages(prev => ({
              ...prev,
              [title]: res.image,
            }));
            setLoadingTitles(prev => prev.filter(t => t !== title));
          };
          img.onerror = () => {
            setLoadingTitles(prev => prev.filter(t => t !== title));
          };
        } else {
          setLoadingTitles(prev => prev.filter(t => t !== title));
        }
      });

      i++;
      setTimeout(fetchNext, 300);
    }

    fetchNext();
  }, [startIndex, data]);

  const handleShowMore = () => {
    setStartIndex(prev => {
      const next = prev + cardsPerPage;
      return next + cardsPerPage <= data.length ? next : 0;
    });
  };

  return (
    <div className="cardlist-outer">
      <div className="cards">
        {visibleData.map((item, i) => {
          const imageUrl = wikiImages[item.title];
          const isLoading = loadingTitles.includes(item.title);

          return (
            <div
              className="card"
              key={item.title}
              onClick={() => onCardClick?.(i + startIndex)}
              style={{
                "--bg-url": imageUrl ? `url(${imageUrl})` : "none",
                backgroundColor: imageUrl ? "transparent" : "#111",
                position: "relative"
              }}
              tabIndex={0}
              role="button"
              aria-pressed="false"
            >
              {isLoading && <div className="card-skeleton" />}
              {isLoading && (
                <div className="card-loading-spinner">
                  <div className="spinner" />
                </div>
              )}

              <div className="card-overlay">
                <h4 className="card-title">
                  <span className="flag-wrap">
                    <FlagOrEmoji code={countryToCode[item.country]} size="1.5em" />
                  </span>
                  <span className="title-text">{item.title}</span>
                </h4>
                <div className="card-details">
                  <div className="country">{item.country}</div>
                  <div className="type">{item.subcategory || item.type}</div>
                  <div className="year">{item.year}</div>
                  <div className={`status status-${item.status.replace(/ /g, "").toLowerCase()}`}>
                    {item.status}
                  </div>
                  {onShowDetail && (
                    <SeeMoreButton
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowDetail(i + startIndex);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {startIndex + cardsPerPage < data.length && (
        <SeeMoreButton onClick={handleShowMore} size="large" />
      )}
    </div>
  );
}