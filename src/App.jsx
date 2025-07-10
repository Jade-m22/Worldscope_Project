import { useState, useRef } from "react";
import "./App.scss";
import Map from "./components/Map";
import Filters from "./components/Filters";
import CardList from "./components/CardList";

// -- Data unique pour tout le site (événements, monuments, conflits...)
const events = [
  {
    title: "Grande Muraille de Chine",
    country: "Chine",
    flag: "🇨🇳",
    year: "220 av. J.-C.",
    desc: "L'une des 7 merveilles du monde, s'étend sur plus de 20 000 km.",
    type: "Monument",
    status: "À visiter",
    position: [40.4319, 116.5704],
  },
  {
    title: "Colisée",
    country: "Italie",
    flag: "🇮🇹",
    year: "80 ap. J.-C.",
    desc: "Ancien amphithéâtre romain, symbole de Rome.",
    type: "Monument",
    status: "À visiter",
    position: [41.8902, 12.4922],
  },
  {
    title: "Bataille de Waterloo",
    country: "Belgique",
    flag: "🇧🇪",
    year: "1815",
    desc: "Victoire décisive sur Napoléon, évènement historique majeur.",
    type: "Conflit",
    status: "Conflit",
    position: [50.6806, 4.4125],
  },
  // ... Ajoute tous tes autres lieux ici avec le bon type
];

function filterEvents(type) {
  if (!type) return events;
  if (type === "Monument") return events.filter(e => e.type === "Monument");
  if (type === "Conflit") return events.filter(e => e.type === "Conflit");
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
    // Scroll/zoom sur la map si besoin (optionnel)
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
