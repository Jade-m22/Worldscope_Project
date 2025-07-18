import { subcategoryColors as subColors } from "../utils/colors";
import events from "../data/events";
import CountrySelect from "./CountrySelect";

export default function Filters({
  onFilter,
  active,
  subFilter,
  onSubFilter,
  onCountryChange,
  country
}) {
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

  // Liste unique des pays (utilisé par CountrySelect)
  const countries = Array.from(new Set(events.map(e => e.country).filter(Boolean)))
    .sort((a, b) => a.localeCompare(b));

  return (
    <section className="filters">
      {/* Sélecteur de pays */}
      <div className="country-select">
        <label htmlFor="country">
          🌎 Filtrer par pays
        </label>
        <CountrySelect
          id="country"
          value={country}
          onChange={onCountryChange}
          countries={countries}
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
