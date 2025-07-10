import { useState, useRef } from "react";
import Header from "./components/Header";
import "./App.scss";
import Map from "./components/Map";
import Filters from "./components/Filters";
import CardList from "./components/CardList";
import Timeline from "./components/Timeline";
import events from "./data/events";

function filterEvents(type, year) {
  let filtered = events;
  if (type && type !== "") {
    filtered = filtered.filter(e => e.type === type);
  }
  // Si year est défini, filtre les events avant ou à cette année
  if (year !== undefined && year !== null) {
    filtered = filtered.filter(e => {
      // Gère les années avec "av. J.-C."
      if (typeof e.year === "string" && e.year.includes("av. J.-C.")) {
        const y = Number(e.year.replace(/[^\d]/g, "")) * -1;
        return y <= year;
      } else if (typeof e.year === "string" && e.year.match(/\d+/)) {
        // Gère les années "312 av. J.-C." ou "80 ap. J.-C."
        const y = parseInt(e.year);
        return y <= year;
      }
      return true; // Par défaut inclus
    });
  }
  return filtered;
}

export default function App() {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [year, setYear] = useState(2025);
  const mapRef = useRef();

  const handleCardClick = idx => {
    setSelected(idx);
    if (mapRef.current) mapRef.current.flyToEvent(idx);
  };
  const handleFilter = type => setFilter(type);
  const handleYear = y => setYear(y);

  // Events filtrés par type et année
  const filteredEvents = filterEvents(filter, year);

  return (
    <div className="App">
      <Header />
      <main>
        <div className="app-layout">
          <aside className="sidebar">
            <Timeline min={-3000} max={2025} year={year} onChange={handleYear} />
            <Filters onFilter={handleFilter} active={filter} />
          </aside>
          <section className="main-content">
            <Map
              data={filteredEvents}
              selected={selected}
              setSelected={setSelected}
              ref={mapRef}
            />
            <CardList data={filteredEvents} onCardClick={handleCardClick} />
          </section>
        </div>
      </main>
    </div>
  );
}