export default function Filters({ onFilter, active, subFilter, onSubFilter }) {
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
    "Autres"
  ];

  const subColors = {
    "Merveilles du monde": "#00d4ff",   // cyan éclatant
    "Monuments historiques": "#3a85ff", // bleu franc
    "Sites naturels": "#58ffe0",        // turquoise pâle
    "Autres": "#9fb8ff"                 // bleu lavande
  };

  return (
    <section className="filters">
      <h3>Filtres</h3>
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
                      style={{ backgroundColor: subColors[cat] }}
                    ></span>
                    {cat}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
