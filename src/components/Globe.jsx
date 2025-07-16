// src/components/Globe.jsx

// On importe React, mais plus besoin de useState/useEffect
import React from "react";
import Globe from "react-globe.gl";

// On importe directement notre fichier JSON local
import countriesData from "../data/countries.json";

const GlobeView = ({ data, onMarkerClick }) => {
  const handlePointClick = (event) => {
    const eventIndex = data.findIndex((e) => e.title === event.title);
    if (eventIndex !== -1 && onMarkerClick) {
      onMarkerClick(eventIndex);
    }
  };

  return (
    <Globe
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
      // On utilise directement les données importées
      polygonsData={countriesData.features}
      polygonCapColor={() => "rgba(0, 0, 0, 0)"}
      polygonSideColor={() => "rgba(0, 0, 0, 0)"}
      polygonStrokeColor={() => "#ffffff60"}
      polygonAltitude={0.01}
    />
  );
};

export default GlobeView;
