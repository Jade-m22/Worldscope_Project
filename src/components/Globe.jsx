// On importe useEffect et forwardRef
import React, { useEffect, forwardRef } from "react";
import Globe from "react-globe.gl";
import countriesData from "../data/countries.json";

const GlobeView = forwardRef(({ data, onMarkerClick }, ref) => {
  // ON AJOUTE DE NOUVEAU LE HOOK USEEFFECT
  useEffect(() => {
    // On s'assure que la ref est prête
    if (ref && ref.current) {
      // On utilise la ref pour accéder aux contrôles et activer la rotation
      ref.current.controls().autoRotate = true;
      ref.current.controls().autoRotateSpeed = 0.5;

      // On désactive le zoom au scroll pour une meilleure expérience
      ref.current.controls().enableZoom = false;
    }
  }, [ref]); // On exécute cet effet quand la ref est disponible

  const handlePointClick = (event) => {
    const eventIndex = data.findIndex((e) => e.title === event.title);
    if (eventIndex !== -1 && onMarkerClick) {
      onMarkerClick(eventIndex);
    }
  };

  return (
    <Globe
      ref={ref}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      backgroundColor="rgba(0,0,0,0)"
      pointsData={data}
      pointLat={(event) => event.position[0]}
      pointLng={(event) => event.position[1]}
      pointLabel={(event) => event.title}
      pointColor={(event) => {
        switch (event.type) {
          case "Conflit":
            return "rgba(255, 0, 0, 0.7)";
          case "À visiter":
            return "rgba(0, 255, 0, 0.7)";
          case "Dangereux":
            return "rgba(255, 165, 0, 0.7)";
          default:
            return "rgba(100, 100, 255, 0.7)";
        }
      }}
      pointRadius={0.5}
      onPointClick={handlePointClick}
      polygonsData={countriesData.features}
      polygonCapColor={() => "rgba(0, 0, 0, 0)"}
      polygonSideColor={() => "rgba(0, 0, 0, 0)"}
      polygonStrokeColor={() => "#ffffff60"}
      polygonAltitude={0.01}
    />
  );
});

export default GlobeView;