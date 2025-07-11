import { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import "./App.scss";
import Map from "./components/Map";
import Filters from "./components/Filters";
import CardList from "./components/CardList";
import Timeline from "./components/Timeline";
import events from "./data/events";
import GlobeView from "./components/Globe";

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
  // on stocke ici l’objet événement sélectionné
  const [selected, setSelected] = useState(null);
  // et ici les détails JSON de Tchernobyl
  const [tchDetails, setTchDetails] = useState(null);

  const [year, setYear] = useState(2025);
  const [viewMode, setViewMode] = useState("map");
  const mapRef = useRef();

  // Chargement du JSON dès que "Tchernobyl" est sélectionné
  useEffect(() => {
    if (selected?.title === "Tchernobyl") {
      fetch("/data/dangerous/tchernobyl_event.json")
        .then((res) => res.json())
        .then((json) => setTchDetails(json))
        .catch((err) => console.error("Erreur fetch Tchernobyl:", err));
    } else {
      // on vide les détails pour tout autre événement
      setTchDetails(null);
    }
  }, [selected]);

  // on passe maintenant l'objet event (et non plus un simple index)
  const handleCardClick = (event) => {
    setSelected(event);
    if (mapRef.current && viewMode === "map") {
      // si besoin, adaptez flyToEvent pour prendre un objet ou un id
      mapRef.current.flyToEvent(event);
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
          <Timeline
            min={-3000}
            max={2025}
            year={year}
            onChange={handleYear}
          />
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
              />
            ) : (
              <GlobeView data={filteredEvents} />
            )}
          </div>

          <CardList data={filteredEvents} onCardClick={handleCardClick} />
        </main>
      </div>

      {/* Conteneur de la fiche détaillée */}
      <div id="detail-container" className="detail-container">
        {selected?.title === "Tchernobyl" && tchDetails && (
          <div className="card">
            <h2>{tchDetails.title}</h2>
            <p>
              <strong>Date :</strong> {tchDetails.date}
            </p>
            <p>
              <strong>Lieu :</strong>{" "}
              {`${tchDetails.location.site}, ${tchDetails.location.city} (${tchDetails.location.region})`}
            </p>
            <p>
              <strong>Réacteur :</strong>{" "}
              {`${tchDetails.reactor.type} (modérateur : ${tchDetails.reactor.moderator}, refroidi à l’${tchDetails.reactor.coolant})`}
            </p>
            <hr />
            <p>
              <strong>Chronologie :</strong>
            </p>
            <ul>
              {tchDetails.chronologie.map((evt, i) => (
                <li key={i}>
                  {evt.date}
                  {evt.time ? ` à ${evt.time}` : ""} — {evt.event}
                </li>
              ))}
            </ul>
            <p>
              <strong>Causes :</strong>
            </p>
            <ul>
              {tchDetails.causes.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
            <p>
              <strong>Conséquences (victimes) :</strong>
            </p>
            <ul>
              <li>Décès immédiats : {tchDetails.consequences.victimes.immediate_deaths}</li>
              <li>
                Syndrome d’irradiation aiguë :{" "}
                {tchDetails.consequences.victimes.acute_irradiation_deaths}
              </li>
              <li>
                Santé long terme : {tchDetails.consequences.victimes.long_term_health}
              </li>
            </ul>
            {/* Vous pouvez ajouter plus de sections (environnement, impact, legacy…) */}
          </div>
        )}
      </div>
    </div>
  );
}
