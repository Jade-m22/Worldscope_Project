import React from "react";
import useFiltersLogic from "./hooks/useFiltersLogic";
import useIsMobile from "./hooks/useIsMobile";

import Header from "./components/Header";
import Map from "./components/Map";
import Filters from "./components/Filters";
import Timeline from "./components/Timeline";
import CardList from "./components/CardList";
import CesiumGlobe from "./components/CesiumGlobe"; // <== Remplacer GlobeView
import EventDetail from "./components/EventDetail";
import ScrollToTopButton from "./components/ScrollToTopButton";
import MobileMenu from "./components/MobileMenu";
import MainLayout from "./layouts/MainLayout";
import BottomSheetPopup from "./components/BottomSheetPopup";

import "./styles/main.scss";

export default function App() {
  const isMobile = useIsMobile();
  const {
    search,
    setSearch,
    filterProps,
    viewMode,
    setViewMode,
    filteredEvents,
    mapRef,
    detailRef,
    selected,
    setSelected,
    detailedIdx,
    handleShowDetail,
    handleCardClick,
    handleCloseDetail,
  } = useFiltersLogic();

  // Mapping pour react-globe.gl
  const getColorByType = (type) => {
    switch (type) {
      case "Conflit":
        return "red";
      case "À visiter":
        return "green";
      case "Dangereux":
        return "orange";
      case "À éviter":
        return "purple";
      default:
        return "blue";
    }
  };

  const globeEvents = filteredEvents.map(ev => ({
    lat: ev.position[0],
    lng: ev.position[1],
    title: ev.title,
    color: getColorByType(ev.type)
  }));

  return (
    <div>
      <MainLayout
        header={<Header search={search} setSearch={setSearch} />}
        sidebar={
          !isMobile ? (
            <div className="desktop-filters">
              <Timeline {...filterProps} />
              <Filters {...filterProps} />
            </div>
          ) : (
            <MobileMenu {...filterProps} />
          )
        }
        main={
          <>
            <div className="view-toggle" style={{ marginBottom: "1rem", textAlign: "center" }}>
              <button onClick={() => setViewMode(viewMode === "map" ? "globe" : "map")}>
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
                <CesiumGlobe data={globeEvents} />
              )}
            </div>

            <CardList
              data={filteredEvents}
              onCardClick={handleCardClick}
              onShowDetail={handleShowDetail}
            />

            <div ref={detailRef} style={{ minHeight: "240px", marginTop: "2.5em" }}>
              {detailedIdx !== null && filteredEvents[detailedIdx] && (
                <EventDetail
                  event={filteredEvents[detailedIdx]}
                  onClose={handleCloseDetail}
                />
              )}
            </div>
          </>
        }
      />
      {isMobile && selected !== null && (
        <BottomSheetPopup
          event={filteredEvents[selected]}
          onClose={() => setSelected(null)}
          onShowDetail={() => {
            handleShowDetail(selected);
            setSelected(null);
          }}
        />
      )}
      <ScrollToTopButton />
    </div>
  );
}