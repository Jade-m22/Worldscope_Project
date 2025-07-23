// src/components/MobileMenu.jsx
import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import Timeline from "./Timeline";

export default function MobileMenu(props) {
  const [open, setOpen] = useState(false);

  const [dyslexiaEnabled, setDyslexiaEnabled] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("dyslexia") === "on") {
      document.body.classList.add("dyslexia");
      setDyslexiaEnabled(true);
    }
  }, []);

  const toggleDyslexia = () => {
    const on = !dyslexiaEnabled;
    setDyslexiaEnabled(on);
    document.body.classList.toggle("dyslexia", on);
    localStorage.setItem("dyslexia", on ? "on" : "off");
  };

  return (
    <div className="mobile-menu-container">
      <button
        className="quiz-button"
        onClick={toggleDyslexia}
        style={{ marginBottom: "0.75rem" }}
      >
        {dyslexiaEnabled ? "Désactiver OpenDys" : "Activer OpenDys"}
      </button>

      <button
        className="mobile-menu-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-panel"
      >
        {open ? "❌ Fermer les filtres" : "☰ Filtres & Période"}
      </button>

      <div
        id="mobile-panel"
        className={`mobile-panel${open ? " open" : ""}`}
        tabIndex={-1}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <div className="mobile-panel-inner" onClick={(e) => e.stopPropagation()}>
          <Timeline {...props} />
          <Filters {...props} />
        </div>
      </div>
    </div>
  );
}
