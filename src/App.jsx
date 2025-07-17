import React from "react";
import useFiltersLogic from "./hooks/useFiltersLogic";
import useIsMobile from "./hooks/useIsMobile";

import Header from "./components/Header";
import Map from "./components/Map";
import Filters from "./components/Filters";
import Timeline from "./components/Timeline";
import CardList from "./components/CardList";
import GlobeView from "./components/Globe";
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
    globeRef,
    detailRef,
    selected,
    setSelected,
    detailedIdx,
    handleShowDetail,
    handleCardClick,
    handleCloseDetail,
  } = useFiltersLogic();

  return (
    <>
      <MainLayout
        header={<Header search={search} setSearch={setSearch} />}
        sidebar={
          !isMobile ? (
            <div className="desktop-filters">
              {/* Ici, la Timeline reçoit bien year et onChange depuis filterProps */}
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
    </>
  );
}
