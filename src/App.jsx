import { useState, useRef } from "react";
import Header from "./components/Header";
import "./App.scss";
import Map from "./components/Map";
import Filters from "./components/Filters";
import CardList from "./components/CardList";
import events from "./data/events";

function filterEvents(type) {
  if (!type) return events;
  if (type === "Monument") return events.filter(e => e.type === "Monument");
  if (type === "Conflit") return events.filter(e => e.type === "Conflit");
  if (type === "À visiter") return events.filter(e => e.status === "À visiter");
  if (type === "À éviter") return events.filter(e => e.status === "À éviter");
  if (type === "Dangereux") return events.filter(e => e.status === "Dangereux");
  return events;
}

export default function App() {
  const [filter, setFilter] = useState(""); // "" = tout, ou "Monument", "Conflit"
  const [selected, setSelected] = useState(null); // l'index de l'événement sélectionné pour ouvrir la popup

  // Référence pour communiquer avec la Map (pour déclencher l'ouverture de popup)
  const mapRef = useRef();

  // Gestion du clic sur une card: ouvrir le popup correspondant sur la carte
  const handleCardClick = idx => {
    setSelected(idx);
    if (mapRef.current) {
      mapRef.current.flyToEvent(idx);
    }
  };

  // Gestion du filtre (passé à Filters.jsx)
  const handleFilter = type => setFilter(type);

  // Data filtrée pour la CardList et la Map
  const filteredEvents = filterEvents(filter);

  return (
    <div className="App">
      <Header />
      <main>
        <div className="layout-main">
          <aside>
            <Filters onFilter={handleFilter} active={filter} />
          </aside>
          <section className="map-section">
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