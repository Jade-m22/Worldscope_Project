import { useState, useEffect } from "react";
import events from "../data/events";
import FlagOrEmoji from "../utils/FlagOrEmoji";
import countryToCode from "../utils/countryCodes";
import { fetchWikiExtract } from "../utils/wiki";
import SeeMoreButton from "./SeeMoreButton";

export default function CardList({ data = events, onCardClick, onShowDetail }) {
  const cardsPerPage = 4;
  const [startIndex, setStartIndex] = useState(0);
  const [wikiImages, setWikiImages] = useState({});

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
      fetchWikiExtract(title).then((res) => {
        if (res?.image) {
          setWikiImages((prev) => ({
            ...prev,
            [title]: res.image
          }));
        }
        i++;
        setTimeout(fetchNext, 300); // délai de 300ms entre chaque appel
      });
    }
    fetchNext();

  }, [startIndex, data, wikiImages]);

  const handleShowMore = () => {
    setStartIndex(prev => {
      const next = prev + cardsPerPage;
      if (next + cardsPerPage <= data.length) return next;
      return 0;
    });
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
          <SeeMoreButton
            onClick={handleShowMore}
            size="large"
          />
      )}
    </div>
  );
}
