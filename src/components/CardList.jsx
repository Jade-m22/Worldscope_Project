import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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
            setWikiImages(prev => ({ ...prev, [title]: res.image }));
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
    // eslint-disable-next-line
  }, [startIndex, data]);

  const handleShowMore = () => {
    setStartIndex(prev => {
      const next = prev + cardsPerPage;
      return next + cardsPerPage <= data.length ? next : 0;
    });
  };

  // Préparation SEO dynamique
  const pageTitle = `Liste des événements (${data.length}) — WorldScope`;
  const pageDescription = `Affichage de ${visibleData.length} événements sur WorldScope. Parcourez et découvrez des lieux historiques et culturels.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <div className="cardlist-outer">
        <div className="cards">
          {visibleData.map((item, i) => {
            const idx = i + startIndex;
            const imageUrl = wikiImages[item.title];
            const isLoading = loadingTitles.includes(item.title);
            const titleId = `card-title-${idx}`;
            const descId = `card-desc-${idx}`;

            return (
              <div
                key={item.title}
                className="card"
                role="button"
                tabIndex={0}
                aria-labelledby={titleId}
                aria-describedby={descId}
                onClick={() => onCardClick?.(idx)}
                style={{
                  "--bg-url": imageUrl ? `url(${imageUrl})` : "none",
                  backgroundColor: imageUrl ? "transparent" : "#111",
                  position: "relative"
                }}
              >
                {isLoading && <div className="card-skeleton" />}
                {isLoading && (
                  <div className="card-loading-spinner">
                    <div className="spinner" />
                  </div>
                )}

                <div className="card-overlay" aria-hidden="true">
                  <h4 id={titleId} className="card-title">
                    <span className="flag-wrap">
                      <FlagOrEmoji
                        code={countryToCode[item.country]}
                        size="1.5em"
                      />
                    </span>
                    <span className="title-text">{item.title}</span>
                  </h4>
                  <div className="card-details" aria-hidden="true">
                    <div className="country">{item.country}</div>
                    <div className="type">{item.subcategory || item.type}</div>
                    <div className="year">{item.year}</div>
                    <div
                      className={`status status-${item.status
                        .replace(/ /g, "")
                        .toLowerCase()}`}
                    >
                      {item.status}
                    </div>
                    {onShowDetail && (
                      <SeeMoreButton
                        onClick={e => {
                          e.stopPropagation();
                          onShowDetail(idx);
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Description accessible pour lecteurs d'écran */}
                <div id={descId} className="sr-only">
                  {`${item.title} — ${item.country}, ${item.year}. Type: ${
                    item.subcategory || item.type
                  }. Statut: ${item.status}.`}
                </div>
              </div>
            );
          })}
        </div>

        {startIndex + cardsPerPage < data.length && (
          <SeeMoreButton onClick={handleShowMore} size="large" />
        )}
      </div>
    </>
  );
}