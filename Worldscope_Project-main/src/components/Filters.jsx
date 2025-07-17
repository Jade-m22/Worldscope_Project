import { subcategoryColors as subColors } from "../utils/colors";
import countryToCode from "../utils/countryCodes";
import events from "../data/events";

export default function Filters({ onFilter, active, subFilter, onSubFilter, onCountryChange, country }) {
  const filters = [
    { label: "Tous", value: "", icon: "🌍" },
    { label: "Conflits", value: "Conflit", icon: "⚔️" },
    { label: "À visiter", value: "À visiter", icon: "⭐" },
    { label: "À éviter", value: "À éviter", icon: "⛔" },
    { label: "Dangereux", value: "Dangereux", icon: "☢️" },
  ];

  const subcategories = [
    "Merveilles du monde",
    "Monuments historiques",
    "Sites naturels",
    "Merveilles antiques"
  ];

  // Extraire tous les pays uniques à partir des événements
  const countries = Array.from(new Set(events.map(e => e.country).filter(Boolean)))
    .sort((a, b) => a.localeCompare(b));

  return (
    <section className="filters">
      {/* Sélecteur de pays */}
      <div className="country-select">
        <label htmlFor="country">
          🌎 Filtrer par pays
          <select
            id="country"
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
          >
            <option value="">Tous les pays</option>
            {countries.map((c) => {
              const emoji = countryToCode[c];
              return (
                <option key={c} value={c}>
                  {emoji ? `${emoji} ` : ""}{c}
                </option>
              );
            })}
          </select>
        </label>
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
                        const checked = e.target.checked;
                        const next = checked
                          ? [...subFilter, cat]
                          : subFilter.filter(c => c !== cat);
                        onSubFilter(next);
                      }}
                    />
                    <span
                      className="color-dot"
                      style={{ backgroundColor: subColors[cat] || "#ccc" }}
                    ></span>
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
