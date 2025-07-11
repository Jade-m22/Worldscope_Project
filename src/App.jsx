import { useState, useRef } from "react";
import Header from "./components/Header";
import "./App.scss";
import Map from "./components/Map";
import Filters from "./components/Filters";
import CardList from "./components/CardList";
import Timeline from "./components/Timeline";
import events from "./data/events";
import GlobeView from "./components/Globe";
import EventDetail from "./components/EventDetail";

// On ajoute le paramètre search à la fonction de filtrage
function filterEvents(filter, year, search) {
  let filtered = events;
  if (filter && filter !== "") {
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
  // Recherche globale (case insensitive) sur titre, pays, année, type, status, desc
  if (search && search.trim() !== "") {
    const s = search.trim().toLowerCase();
    filtered = filtered.filter(e => {
      return (
        (e.title && e.title.toLowerCase().includes(s)) ||
        (e.country && e.country.toLowerCase().includes(s)) ||
        (e.status && e.status.toLowerCase().includes(s)) ||
        (e.type && e.type.toLowerCase().includes(s)) ||
        (e.year && String(e.year).toLowerCase().includes(s)) ||
        (e.desc && e.desc.toLowerCase().includes(s))
      );
    });
  }
  return filtered;
}

export default function App() {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [detailedIdx, setDetailedIdx] = useState(null);
  const [year, setYear] = useState(2025);
  const [viewMode, setViewMode] = useState("map");
  const [search, setSearch] = useState(""); // ← AJOUT pour la recherche globale

  const mapRef = useRef();
  const detailRef = useRef();

  // Passe la recherche globale au filtre
  const filteredEvents = filterEvents(filter, year, search);

  // Pour scroller jusqu'à la section de détail
  const handleShowDetail = (idx) => {
    setDetailedIdx(idx);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 180);
  };

  const handleCardClick = (idx) => {
    setSelected(idx);
    if (mapRef.current && viewMode === "map") {
      mapRef.current.flyToEvent(idx);
    }
  };
  const handleFilter = (type) => setFilter(type);
  const handleYear = (y) => setYear(y);

  return (
    <div className="with-header">
      <Header search={search} setSearch={setSearch} /> {/* Passe la recherche ici */}
      <div className="app-layout">
        <aside className="sidebar">
          <Timeline min={-3000} max={2025} year={year} onChange={handleYear} />
          <Filters onFilter={handleFilter} active={filter} />
        </aside>
        <main className="main-content">
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
            {viewMode === "map" ? (
              <Map
                data={filteredEvents}
                selected={selected}
                setSelected={setSelected}
                ref={mapRef}
                onShowDetail={handleShowDetail}
              />
            ) : (
              <GlobeView data={filteredEvents} />
            )}
          </div>
          <CardList
            data={filteredEvents}
            onCardClick={handleCardClick}
            onShowDetail={handleShowDetail}
          />

          {/* ZONE DÉTAIL EN BAS */}
          <div ref={detailRef} style={{ minHeight: "240px", marginTop: "2.5em" }}>
            {detailedIdx !== null && filteredEvents[detailedIdx] && (
              <EventDetail event={filteredEvents[detailedIdx]} onClose={() => setDetailedIdx(null)} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}