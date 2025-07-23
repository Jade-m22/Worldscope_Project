import React from "react";
import FlagOrEmoji from "../utils/FlagOrEmoji";
import countryToCode from "../utils/countryCodes";
import "../styles/components/bottomsheetpopup.scss";

const PlusIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18, marginLeft: 6, verticalAlign: "middle" }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export default function BottomSheetPopup({ event, onClose, onShowDetail }) {
  if (!event) return null;

  return (
    <div className="map-bottom-sheet" onClick={onClose}>
      <div className="sheet-content" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-header">
          <div className="handle" />
        </div>

        <div className="sheet-body">
          <div className="sheet-title">
            <FlagOrEmoji code={countryToCode[event.country]} size="1.5em" />
            {event.title}
          </div>

          <div className="sheet-meta">
            {event.country} · {event.year}
          </div>

          {event.desc && <div className="sheet-desc">{event.desc}</div>}

          <div className="sheet-actions">
            <button className="detail-btn" onClick={onShowDetail}>
              Voir plus de détails {PlusIcon}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}