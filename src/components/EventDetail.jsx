// src/components/EventDetail.jsx
import { useState, useEffect } from "react";
import FlagOrEmoji from "../utils/FlagOrEmoji";
import countryToCode from "../utils/countryCodes";
import { fetchWikiExtract } from "../utils/wiki";

export default function EventDetail({ event }) {
  const [wikiText, setWikiText] = useState("");

  useEffect(() => {
    let mounted = true;
    if (!event?.title) return;
    // reset à chaque changement d’event
    setWikiText("");
    fetchWikiExtract(event.title)
      .then(text => {
        if (mounted && text) setWikiText(text);
      })
      .catch(err => console.error(err));
    return () => {
      mounted = false;
    };
  }, [event.title]);

  if (!event) return null;

  const imgPath = `/assets/images/${event.title.replace(/[^\w]/g, "_")}.webp`;

  return (
    <div style={{
      margin: "40px auto 0",
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
            width: 210,
            height: 170,
            objectFit: "cover",
            borderRadius: "13px",
            boxShadow: "0 3px 11px #2a445544"
          }}
          onError={e => e.target.style.display = "none"}
        />
        <div>
          <div style={{ fontSize: "1.3em", fontWeight: 700, marginBottom: 5 }}>
            <FlagOrEmoji code={countryToCode[event.country]} size="1.5em" />
            {" "}{event.title}
          </div>
          <div style={{ color: "#9ffad8", fontSize: "1.08em" }}>
            {event.country} &middot; {event.year}<br/>
            <span style={{ color: "#ffe65e" }}>{event.type}</span>
          </div>
          <div className="event-detail-desc">
            {event.desc}
          </div>

          {/* === Injection du résumé Wikipédia === */}
          {wikiText && (
            <div style={{
              marginTop: 12,
              fontSize: "1.06em",
              color: "#ffeebb",
              fontStyle: "italic",
              lineHeight: 1.4
            }}>
              {wikiText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
