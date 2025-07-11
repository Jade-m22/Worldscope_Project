import { useState, useRef } from "react";
import Header from "./components/Header";
import "./App.scss";
import Map from "./components/Map";
import Filters from "./components/Filters";
import CardList from "./components/CardList";
import Timeline from "./components/Timeline";
import events from "./data/events";
import GlobeView from "./components/Globe"; // AJOUTÉ : Importation du nouveau composant

// Version corrigée :
function filterEvents(filter, year) {
  let filtered = events;
  if (filter && filter !== "") {
    // On filtre sur status ou type selon le filtre
    if (["À visiter", "À éviter", "Dangereux"].includes(filter)) {
      filtered = filtered.filter(e => e.status === filter);
    } else {
      filtered = filtered.filter(e => e.type === filter);
    }
  }
  if (year !== undefined && year !== null) {
    filtered = filtered.filter((e) => {
      if (typeof e.year === "string" && e.year.includes("av. J.-C.")) {
        const y = Number(e.year.replace(/[^\d]/g, "")) * -1;
        return y <= year;
      } else if (typeof e.year === "string" && e.year.match(/\d+/)) {
        const y = parseInt(e.year);
        return y <= year;
      }
      return true;
    });
  }
  return filtered;
}

export default function App() {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [year, setYear] = useState(2025);
  const [viewMode, setViewMode] = useState("map"); // AJOUTÉ : L'état pour gérer la vue (map/globe)
  const mapRef = useRef();

  const handleCardClick = (idx) => {
    setSelected(idx);
    if (mapRef.current && viewMode === "map") {
      // On s'assure de n'appeler flyToEvent qu'en mode carte
      mapRef.current.flyToEvent(idx);
    }
  };
  const handleFilter = (type) => setFilter(type);
  const handleYear = (y) => setYear(y);

  const filteredEvents = filterEvents(filter, year);

  return (
    <div className="with-header">
      <Header />
      <div className="app-layout">
        <aside className="sidebar">
          <Timeline min={-3000} max={2025} year={year} onChange={handleYear} />
          <Filters onFilter={handleFilter} active={filter} />
        </aside>
        <main className="main-content">
          {/* AJOUTÉ : Bouton pour changer de vue */}
          <div
            className="view-toggle"
            style={{ marginBottom: "1rem", textAlign: "center" }}
          >
            <button
              onClick={() =>
                setViewMode((prev) => (prev === "map" ? "globe" : "map"))
              }
            >
              Passer à la vue {viewMode === "map" ? "Globe 3D" : "Carte 2D"}
            </button>
          </div>

          <div className="map-card">
            {/* AJOUTÉ : Affichage conditionnel de la carte ou du globe */}
            {viewMode === "map" ? (
              <Map
                data={filteredEvents}
                selected={selected}
                setSelected={setSelected}
                ref={mapRef}
              />
            ) : (
              <GlobeView data={filteredEvents} />
            )}
          </div>
          <CardList data={filteredEvents} onCardClick={handleCardClick} />
        </main>
      </div>
    </div>
  );
}
