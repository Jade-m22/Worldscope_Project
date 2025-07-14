import { useState, useEffect } from "react";
import FlagOrEmoji from "../utils/FlagOrEmoji";
import countryToCode from "../utils/countryCodes";
import { fetchWikiExtract } from "../utils/wiki";

export default function EventDetail({ event }) {
  const [wikiText, setWikiText] = useState("");
  const [wikiImage, setWikiImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!event?.title) return;

    setWikiText("");
    setWikiImage("");

    fetchWikiExtract(event.title)
      .then(data => {
        if (mounted && data) {
          setWikiText(data.extract);
          setWikiImage(data.image);
        }
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, [event.title]);

  // Optionnel : fermeture avec la touche Echap
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isModalOpen]);

  if (!event) return null;

  return (
    <div className="event-detail">
      <div className="event-detail-main">
        {wikiImage && (
          <div className="event-detail-image">
            <img
              src={wikiImage}
              alt={event.title}
              style={{ cursor: "zoom-in" }}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        )}

        <div className="event-detail-text">
          <div className="event-detail-title">
            <FlagOrEmoji code={countryToCode[event.country]} size="1.5em" />
            {event.title}
          </div>

          <div className="event-detail-meta">
            {event.country} &middot; {event.year}
          </div>

          {event.type && (
            <div className="event-detail-highlight">
              <span className="event-detail-type">{event.type}</span>
              {event.subcategory && (
                <span className="event-detail-subcategory"> — {event.subcategory}</span>
              )}
            </div>
          )}

          {event.desc && <div className="event-detail-desc">{event.desc}</div>}

          {wikiText && <div className="event-detail-more">{wikiText}</div>}
        </div>
      </div>

      {/* Modal lightbox */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <img
            src={wikiImage}
            alt={event.title}
            className="modal-image"
            onClick={e => e.stopPropagation()} // empêche fermeture en cliquant sur l'image
          />
        </div>
      )}
    </div>
  );
}