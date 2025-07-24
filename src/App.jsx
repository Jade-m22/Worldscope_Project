import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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
import CookieConsentModal from "./components/CookieConsentModal";

import "./styles/main.scss";

const CONSENT_KEY = "worldscope_consent";

export default function App() {
  const isMobile = useIsMobile();
  const [hasConsent, setHasConsent] = useState(false);

  // Vérifier et charger l'état de consentement
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      setHasConsent(true);
    }
  }, []);

  // Callback lorsque l'utilisateur donne son consentement
  function handleConsentAccepted() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setHasConsent(true);
  }

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

  const globeEvents = filteredEvents.map((ev) => ({
    lat: ev.position[0],
    lng: ev.position[1],
    title: ev.title,
    color: getColorByType(ev.type),
  }));

  const handleGlobeMarkerClick = ({ title, lat, lng }) => {
    const idx = filteredEvents.findIndex(
      (e) =>
        e.title === title &&
        e.position[0] === lat &&
        e.position[1] === lng
    );
    if (idx !== -1) handleShowDetail(idx);
  };

  const handleGlobeCountryClick = (countryName) => {
    setCountryFilter(countryName);
  };

  const pageTitle = `WorldScope — ${filteredEvents.length} événements`;
  const pageDescription = filteredEvents.length
    ? `Explorez ${filteredEvents.length} événements historiques sur WorldScope. Filtrez par période, type, et découvrez des extraits et images.`
    : "WorldScope — Explorez des événements historiques sur carte 2D et globe 3D.";

  return (
    <>
      {/* Modal de consentement RGPD */}
      <CookieConsentModal
        onConsent={handleConsentAccepted}
      />

      <div>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
        </Helmet>

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
              {/* Bascule carte / globe */}
              <div className="view-toggle">
                <button
                  onClick={() =>
                    setViewMode(viewMode === "map" ? "globe" : "map")
                  }
                >
                  <div className="button-content">
                    <div className="icon-wrapper">
                      {viewMode === "map" ? (
                        /* Icône globe 3D */
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      ) : (
                        /* Icône carte 2D */
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                          <line x1="8" y1="2" x2="8" y2="18" />
                          <line x1="16" y1="6" x2="16" y2="22" />
                        </svg>
                      )}
                    </div>
                    <span className="text">
                      {viewMode === "map" ? "Vue Globe 3D" : "Vue Carte 2D"}
                    </span>
                  </div>
                </button>
              </div>

              {/* Avertissement consentement */}
              {!hasConsent && (
                <p className="consent-warning">
                  Vous devez accepter la gestion des cookies pour explorer la carte.
                </p>
              )}

              {/* Carte responsive (wrapper 16/9) */}
              <div className="map-card">
                <div className="map-responsive-wrapper">
                  {viewMode === "map" ? (
                    <Map
                      data={filteredEvents}
                      selected={selected}
                      setSelected={setSelected}
                      ref={mapRef}
                      onShowDetail={handleShowDetail}
                      disabled={!hasConsent}
                    />
                  ) : (
                    hasConsent && (
                      <CesiumGlobe
                        data={globeEvents}
                        onMarkerClick={handleGlobeMarkerClick}
                        onCountryClick={handleGlobeCountryClick}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Liste de cartes */}
              <CardList
                data={filteredEvents}
                onCardClick={hasConsent ? handleCardClick : null}
                onShowDetail={hasConsent ? handleShowDetail : null}
              />

              {/* Détail événement */}
              <div
                ref={detailRef}
                style={{ minHeight: "240px", marginTop: "2.5em" }}
              >
                {detailedIdx !== null && filteredEvents[detailedIdx] && hasConsent && (
                  <EventDetail
                    event={filteredEvents[detailedIdx]}
                    onClose={handleCloseDetail}
                  />
                )}
              </div>
            </>
          }
        />

        {/* Bottom sheet sur mobile */}
        {isMobile && selected !== null && hasConsent && (
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
    </>
  );
}