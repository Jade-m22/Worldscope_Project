export default function Filters({ onFilter, active }) {
  const filters = [
    { label: "Tous", value: "", icon: "🌍" },
    { label: "Monuments", value: "Monument", icon: "🗿" },
    { label: "Conflits", value: "Conflit", icon: "⚔️" },
    { label: "À visiter", value: "À visiter", icon: "⭐" },
    { label: "À éviter", value: "À éviter", icon: "⛔" },
    { label: "Dangereux", value: "Dangereux", icon: "☢️" },
  ];

  return (
    <section className="filters">
      <h3>Filtres</h3>
      <div className="filters-list">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`filter-button ${active === f.value ? "active" : ""}`}
            onClick={() => onFilter(f.value)}
          >
            <span className="icon">{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>
    </section>
  );
}
