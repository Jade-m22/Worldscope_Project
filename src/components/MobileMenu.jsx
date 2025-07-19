import { useState } from "react";
import Filters from "./Filters";
import Timeline from "./Timeline";

export default function MobileMenu(props) {
  const [open, setOpen] = useState(false);

  // !! On ne bloque PLUS le body ici !!
  // useEffect inutile : on laisse le body scrollable

  return (
    <div className="mobile-menu-container">
      <button
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
        <div className="mobile-panel-inner" onClick={e => e.stopPropagation()}>
          <Timeline {...props} />
          <Filters {...props} />
        </div>
      </div>
    </div>
  );
}