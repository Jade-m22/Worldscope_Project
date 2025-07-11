import FlagOrEmoji from "../utils/FlagOrEmoji";
import countryToCode from "../utils/countryCodes";

export default function EventDetail({ event }) {
  if (!event) return null;

  // Convention: image en assets/images, nommée selon le titre
  const imgPath = `/assets/images/${event.title.replace(/[^\w]/g, "_")}.webp`;

  // Pour cacher l'image si non trouvée
  function handleImgError(e) {
    e.target.style.display = "none";
  }

  return (
    <div className="event-detail">
      <div className="event-detail-main">
        <img
          src={imgPath}
          alt={event.title}
          className="event-detail-img"
          onError={handleImgError}
        />
        <div className="event-detail-text">
          <div className="event-detail-title">
            <FlagOrEmoji code={countryToCode[event.country]} size="1.5em" /> {event.title}
          </div>
          <div className="event-detail-meta">
            {event.country} &middot; {event.year} <br />
            <span className="event-detail-type">{event.type}</span>
          </div>
          <div className="event-detail-desc">
            {event.desc}
          </div>
          <div className="event-detail-more">
            <i>
              [Texte complémentaire à ajouter ou à injecter par API/Wikipedia, selon la clé du point]
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}