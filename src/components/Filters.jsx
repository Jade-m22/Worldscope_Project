export default function Filters({ onFilter, active }) {
  return (
    <section className="filters">
      <h3>Filtres</h3>
      <div className="filters-list">
        <button className={active==="" ? "active" : ""} onClick={()=>onFilter("")}>🌍 Tous</button>
        <button className={active==="Monument" ? "active" : ""} onClick={()=>onFilter("Monument")}>🗿 Monuments</button>
        <button className={active==="Conflit" ? "active" : ""} onClick={()=>onFilter("Conflit")}>⚔️ Conflits</button>
        <button className={active==="À visiter" ? "active" : ""} onClick={()=>onFilter("À visiter")}>⭐ À visiter</button>
        <button className={active==="À éviter" ? "active" : ""} onClick={()=>onFilter("À éviter")}>⛔ À éviter</button>
        <button className={active==="Dangereux" ? "active" : ""} onClick={()=>onFilter("Dangereux")}>☢️ Dangereux</button>
      </div>
    </section>
  );
}