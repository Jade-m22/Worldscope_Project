// src/App.jsx
import React, { useRef, useState } from "react";
import useEventState from "./hooks/useEventState";
import filterEvents from "./utils/filterEvents";

import Header from "./components/Header";
import Map from "./components/Map";
import Filters from "./components/Filters";
import CardList from "./components/CardList";
import Timeline from "./components/Timeline";
import GlobeView from "./components/Globe";
import EventDetail from "./components/EventDetail";
import ScrollToTopButton from "./components/ScrollToTopButton";
import MainLayout from "./layouts/MainLayout";

import "./App.scss";

export default function App() {
  const {
    filter,
    setFilter,
    selected,
    setSelected,
    detailedIdx,
    setDetailedIdx,
    search,
    setSearch,
  } = useEventState();

  const [viewMode, setViewMode] = useState("map");
  const [subFilter, setSubFilter] = useState([]);
  const [country, setCountry] = useState("");
  const [range, setRange] = useState([-3000, 2025]);

  const mapRef = useRef();
  const globeRef = useRef();
  const detailRef = useRef();

  const handleFilterChange = (value) => {
    setFilter(value);
    if (value !== "À visiter") {
      setSubFilter([]);
    }
  };

  const filteredEvents = filterEvents(
    filter,
    range,
    search,
    subFilter,
    country
  );

  // MODIFIÉ : Arrête la rotation ici
  const handleShowDetail = (idx) => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = false;
    }
    setDetailedIdx(idx);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 180);
  };

  // AJOUTÉ : Nouvelle fonction pour fermer les détails et relancer la rotation
  const handleCloseDetail = () => {
    setDetailedIdx(null);
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
    }
  };

  const handleCardClick = (idx) => {
    setSelected(idx);
    const event = filteredEvents[idx];

    if (mapRef.current && viewMode === "map") {
      mapRef.current.flyToEvent(idx);
    } else if (globeRef.current && viewMode === "globe" && event) {
      if (globeRef.current) {
        globeRef.current.controls().autoRotate = false;
      }
      globeRef.current.pointOfView(
        {
          lat: event.position[0],
          lng: event.position[1],
          altitude: 0.5,
        },
        1600
      );
    }
  };

  return (
    <MainLayout
      header={<Header search={search} setSearch={setSearch} />}
      sidebar={
        <>
          <Timeline
            min={-3000}
            max={2025}
            range={range}
            onChange={setRange}
            labelMode="above"
          />
          <Filters
            onFilter={handleFilterChange}
            active={filter}
            subFilter={subFilter}
            onSubFilter={setSubFilter}
            country={country}
            onCountryChange={setCountry}
          />
        </>
      }
      main={
        <>
          <div
            className="view-toggle"
            style={{ marginBottom: "1rem", textAlign: "center" }}
          >
            <button
              onClick={() => setViewMode(viewMode === "map" ? "globe" : "map")}
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
              <GlobeView
                ref={globeRef}
                data={filteredEvents}
                onMarkerClick={handleShowDetail}
              />
            )}
          </div>
          <CardList
            data={filteredEvents}
            onCardClick={handleCardClick}
            onShowDetail={handleShowDetail}
          />
          <div
            ref={detailRef}
            style={{ minHeight: "240px", marginTop: "2.5em" }}
          >
            {detailedIdx !== null && filteredEvents[detailedIdx] && (
              <EventDetail
                event={filteredEvents[detailedIdx]}
                onClose={handleCloseDetail} // MODIFIÉ : On utilise la nouvelle fonction
              />
            )}
          </div>
        </>
      }
    />
  );
}
