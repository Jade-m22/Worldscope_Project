import "./Filters.scss";

export default function Filters({ onFilter, active }) {
  return (
    <section className="filters">
      <h3>Filtres</h3>
      <div className="filters-list">
        <button
          className={active === "" ? "active" : ""}
          onClick={() => onFilter("")}
        >
          🌍 Tous
        </button>
        <button
          className={active === "Monument" ? "active" : ""}
          onClick={() => onFilter("Monument")}
        >
          🗿 Monuments
        </button>
        <button
          className={active === "Conflit" ? "active" : ""}
          onClick={() => onFilter("Conflit")}
        >
          ⚔️ Conflits
        </button>
        {/* Ajoute d'autres filtres si besoin */}
      </div>
    </section>
  );
}
