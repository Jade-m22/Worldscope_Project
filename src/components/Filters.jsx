import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { subcategoryColors as subColors } from "../utils/colors";
import CountrySelect from "./CountrySelect";
import "../styles/components/filters.scss";

export default function Filters({
  onFilter,
  active,
  subFilter,
  onSubFilter,
  onCountryChange,
  country,
}) {
  // ↳ état et restauration de la préférence dyslexie
  const [dyslexiaEnabled, setDyslexiaEnabled] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("dyslexia") === "on") {
      document.body.classList.add("dyslexia");
      setDyslexiaEnabled(true);
    }
  }, []);

  // ↳ fonction pour basculer OpenDyslexic
  const toggleDyslexia = () => {
    const on = !dyslexiaEnabled;
    setDyslexiaEnabled(on);
    document.body.classList.toggle("dyslexia", on);
    localStorage.setItem("dyslexia", on ? "on" : "off");
  };

  // 📝 SEO dynamique
  const filtersList = [
    { label: "Tous",      value: "",           icon: "🌍" },
    { label: "Conflits",   value: "Conflit",    icon: "⚔️" },
    { label: "À visiter",  value: "À visiter",  icon: "⭐" },
    { label: "À éviter",   value: "À éviter",   icon: "⛔" },
    { label: "Dangereux",  value: "Dangereux",  icon: "☢️" },
  ];
  const activeLabel  = filtersList.find(f => f.value === active)?.label || "Tous";
  const countryLabel = country || "Tous les pays";
  const subLabel     = subFilter.length ? subFilter.join(", ") : "aucune sous-catégorie";
  const pageTitle       = `Filtres: ${activeLabel} | ${countryLabel} — WorldScope`;
  const pageDescription = `Affichage des événements filtrés: type "${activeLabel}", pays "${countryLabel}", sous-catégories: ${subLabel}.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <section className="filters">
        {/* ————— OpenDys Toggle ————— */}
        <div className="filters-dyslexia-toggle">
          <button className="quiz-button" onClick={toggleDyslexia}>
            {dyslexiaEnabled ? "Désactiver OpenDys" : "Activer OpenDys"}
          </button>
        </div>

        <div className="country-select">
          <div className="country-select-title">🌎 Filtrer par pays</div>
          <CountrySelect
            value={country}
            onChange={onCountryChange}
          />
        </div>

        <div className="filters-list">
          {filtersList.map((f) => (
            <div key={f.value}>
              <button
                className={`filter-button ${active === f.value ? "active" : ""}`}
                onClick={() => onFilter(f.value)}
              >
                <span className="icon">{f.icon}</span>
                {f.label}
              </button>

              {f.value === "À visiter" && active === "À visiter" && (
                <div className="subfilters">
                  <p className="sub-title">Catégories à visiter</p>
                  {[
                    "Merveilles du monde",
                    "Monuments historiques",
                    "Sites naturels",
                    "Merveilles antiques",
                  ].map((cat) => (
                    <label key={cat} className="subfilter-label">
                      <input
                        type="checkbox"
                        checked={subFilter.includes(cat)}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...subFilter, cat]
                            : subFilter.filter((c) => c !== cat);
                          onSubFilter(next);
                        }}
                      />
                      <span
                        className="color-dot"
                        style={{ backgroundColor: subColors[cat] || "#ccc" }}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          className="reset-button"
          onClick={() => {
            onFilter("");
            onSubFilter([]);
            onCountryChange("");
          }}
        >
          🔄 Réinitialiser les filtres
        </button>
      </section>
    </>
  );
}