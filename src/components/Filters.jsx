// src/components/Filters.jsx
import React from "react";
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
  const filters = [
    { label: "Tous",      value: "",           icon: "🌍" },
    { label: "Conflits",   value: "Conflit",    icon: "⚔️" },
    { label: "À visiter",  value: "À visiter",  icon: "⭐" },
    { label: "À éviter",   value: "À éviter",   icon: "⛔" },
    { label: "Dangereux",  value: "Dangereux",  icon: "☢️" },
  ];

  const subcategories = [
    "Merveilles du monde",
    "Monuments historiques",
    "Sites naturels",
    "Merveilles antiques",
  ];

  return (
    <section className="filters">
      <div className="country-select">
        <div className="country-select-title">🌎 Filtrer par pays</div>
        <CountrySelect
          value={country}
          onChange={onCountryChange}
        />
      </div>

      <div className="filters-list">
        {filters.map((f) => (
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
                {subcategories.map((cat) => (
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
  );
}