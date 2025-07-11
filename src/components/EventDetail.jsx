import FlagOrEmoji from "../utils/FlagOrEmoji";
import countryToCode from "../utils/countryCodes";

export default function EventDetail({ event }) {
  if (!event) return null;
  // Ajoute ici récupération de ton image par convention (ex: /assets/images/{event.title}.webp)
  const imgPath = `/assets/images/${event.title.replace(/[^\w]/g, "_")}.webp`;
  return (
    <div style={{
      margin: "40px auto 0 auto",
      background: "#172439f2",
      borderRadius: "16px",
      boxShadow: "0 2px 20px #18444a77",
      padding: "26px 32px",
      color: "#dff9fd",
      maxWidth: 800,
      minHeight: 260
    }}>
      <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
        <img
          src={imgPath}
          alt={event.title}
          style={{
            width: 210, height: 170, objectFit: "cover",
            borderRadius: "13px", boxShadow: "0 3px 11px #2a445544"
          }}
          onError={e => e.target.style.display = "none"} // Masque si non trouvée
        />
        <div>
          <div style={{ fontSize: "1.3em", fontWeight: 700, marginBottom: 5 }}>
            <FlagOrEmoji code={countryToCode[event.country]} size="1.5em" /> {event.title}
          </div>
          <div style={{ color: "#9ffad8", fontSize: "1.08em" }}>
            {event.country} &middot; {event.year} <br />
            <span style={{ color: "#ffe65e" }}>{event.type}</span>
          </div>
          <div style={{ margin: "10px 0", fontSize: "1.04em" }}>
            {event.desc}
          </div>
          {/* Ici tu mets un texte plus long tiré de Wikipedia ou autre */}
          <div style={{
            marginTop: 12,
            fontSize: "1.06em",
            color: "#ffeebb"
          }}>
            {/* Remplace ceci par du vrai texte plus détaillé quand tu en as */}
            <i>
              [Texte complémentaire à ajouter ou à injecter par API/Wikipedia, selon la clé du point]
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}