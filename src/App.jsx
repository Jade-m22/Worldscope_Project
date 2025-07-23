import React from "react";
import useFiltersLogic from "./hooks/useFiltersLogic";
import useIsMobile from "./hooks/useIsMobile";

import Header from "./components/Header";
import Map from "./components/Map";
import Filters from "./components/Filters";
import Timeline from "./components/Timeline";
import CardList from "./components/CardList";
import CesiumGlobe from "./components/CesiumGlobe";
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
    setCountryFilter,
  } = useFiltersLogic();

  // Coloration pour les points du globe
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

  // Data à passer au globe (points)
  const globeEvents = filteredEvents.map(ev => ({
    lat: ev.position[0],
    lng: ev.position[1],
    title: ev.title,
    color: getColorByType(ev.type)
  }));

  // Affiche le détail d'un event quand on clique sur un marker sur le globe
  const handleGlobeMarkerClick = (event) => {
    const idx = filteredEvents.findIndex(
      e => e.title === event.title &&
           e.position[0] === event.lat &&
           e.position[1] === event.lng
    );
    if (idx !== -1) handleShowDetail(idx);
  };

  const handleGlobeCountryClick = (countryName) => {
    setCountryFilter(countryName);
  };

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
            <div className="view-toggle">
              <button onClick={() => setViewMode(viewMode === "map" ? "globe" : "map")}>
                <div className="button-content">
                  <div className="icon-wrapper">
                    {viewMode === "map" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                        <line x1="8" y1="2" x2="8" y2="18"/>
                        <line x1="16" y1="6" x2="16" y2="22"/>
                      </svg>
                    )}
                  </div>
                  <span className="text">{viewMode === "map" ? "Vue Globe 3D" : "Vue Carte 2D"}</span>
                </div>
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
                <CesiumGlobe
                  data={globeEvents}
                  onMarkerClick={handleGlobeMarkerClick}
                  onCountryClick={handleGlobeCountryClick}
                />
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