import React, { useState, useEffect } from "react";
// Correction du chemin, on remonte d’un cran pour pointer vers styles/components
import "../styles/components/CookieConsentModal.scss";

const COOKIE_NAME = "worldscope_consent";

export default function CookieConsentModal({ onConsent }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_NAME);
    if (consent !== "accepted") {
      setIsVisible(true);
    } else {
      onConsent();
    }
  }, [onConsent]);

  function accept() {
    localStorage.setItem(COOKIE_NAME, "accepted");
    setIsVisible(false);
    onConsent();
  }

  function refuse() {
    localStorage.setItem(COOKIE_NAME, "refused");
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <div className="cookie-consent__backdrop" role="dialog" aria-modal="true">
      <div className="cookie-consent__modal">
        <h2>Gestion des cookies et stockages</h2>
        <p>
          Pour améliorer votre expérience, nous stockons :
          <ul>
            <li>Votre préférence OpenDyslexic (pour l’accessibilité)</li>
            <li>Des images en cache pour réduire le temps de chargement</li>
            <li>Autres données dans le localStorage</li>
          </ul>
          Ces données ne sont pas personnelles et sont utilisées uniquement par l’application.
        </p>
        <div className="cookie-consent__actions">
          <button onClick={refuse} className="btn btn--secondary">
            Refuser
          </button>
          <button onClick={accept} className="btn btn--primary">
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
