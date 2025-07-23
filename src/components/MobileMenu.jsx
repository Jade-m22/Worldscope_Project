import { useState } from "react";
import { Helmet } from "react-helmet";
import Filters from "./Filters";
import Timeline from "./Timeline";

/**
 * MobileMenu Component
 * Panneau mobile pour les filtres et la timeline, en conservant le style et la structure d'origine.
 */
export default function MobileMenu(props) {
  const [open, setOpen] = useState(false);

  // SEO dynamique selon l'état du panneau
  const pageTitle = open
    ? "Filtres & Période — WorldScope"
    : "WorldScope — Explorateur d'événements";
  const pageDescription = open
    ? "Affinez votre recherche d'événements avec les filtres et la timeline sur WorldScope."
    : "Application WorldScope – explorez des événements historiques sur carte et globe.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <div className="mobile-menu-container">
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-panel"
        >
          {open ? "❌ Fermer les filtres" : "☰ Filtres & Période"}
        </button>

        {/* Panneau mobile overlay, mais body scrollable */}
        <div
          id="mobile-panel"
          className={`mobile-panel${open ? " open" : ""}`}
          tabIndex={-1}
          aria-hidden={!open}
          onClick={() => setOpen(false)}
        >
          <div
            className="mobile-panel-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <Timeline {...props} />
            <Filters {...props} />
          </div>
        </div>
      </div>
    </>
  );
}