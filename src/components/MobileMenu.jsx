import { useState } from "react";
import Filters from "./Filters";
import Timeline from "./Timeline";

export default function MobileMenu(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-menu-container">
      <button className="mobile-menu-toggle" onClick={() => setOpen(!open)}>
        {open ? "❌ Fermer les filtres" : "☰ Filtres & Période"}
      </button>

      <div className={`mobile-panel ${open ? "open" : ""}`}>
        <Timeline {...props} />
        <Filters {...props} />
      </div>
    </div>
  );
}
