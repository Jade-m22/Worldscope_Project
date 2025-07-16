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

export default function App() {  const {
    filter,
    setFilter,
    selected,
    setSelected,
    detailedIdx,
    setDetailedIdx,
    year,
    setYear,
    search,
    setSearch,
  } = useEventState();

  const [viewMode, setViewMode] = useState("map");
  const [subFilter, setSubFilter] = useState([]);
  const [country, setCountry] = useState("");

  const mapRef = useRef();
  const detailRef = useRef();

  const handleFilterChange = (value) => {
    setFilter(value);
    if (value !== "À visiter") {
      setSubFilter([]);
    }
  };

  const filteredEvents = filterEvents(filter, year, search, subFilter, country);

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

  const safeYear = typeof year === "number" && !isNaN(year) ? year : 2025;

  return (
    <>
      <MainLayout
        header={<Header search={search} setSearch={setSearch} />}
        sidebar={
          <>
            <Timeline min={-3000} max={2025} year={safeYear} onChange={setYear} />
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
                  onClose={() => setDetailedIdx(null)}
                />
              )}
            </div>
          </>
        }
      />
      <ScrollToTopButton />
    </>
  );
}