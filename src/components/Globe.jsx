// src/components/Globe.jsx

// 1. On importe "useRef" et "useEffect" en plus de React
import React, { useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import countriesData from "../data/countries.json";

// Note: Pour cette solution, on n'a plus besoin de forwardRef pour l'instant
const GlobeView = ({ data, onMarkerClick }) => {
  // 2. On crée une "télécommande" (ref) pour notre globe
  const globeEl = useRef();

  // 3. On utilise useEffect pour exécuter du code après l'affichage du globe
  useEffect(() => {
    // On s'assure que le globe est bien là
    if (globeEl.current) {
      // On accède à ses contrôles et on active manuellement la rotation
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []); // Le tableau vide signifie : "ne fais ça qu'une seule fois"

  const handlePointClick = (event) => {
    const eventIndex = data.findIndex((e) => e.title === event.title);
    if (eventIndex !== -1 && onMarkerClick) {
      onMarkerClick(eventIndex);
    }
  };

  return (
    <Globe
      // 4. On branche notre "télécommande" sur le globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      backgroundColor="rgba(0,0,0,0)"
      // On peut réactiver les données
      pointsData={data}
      polygonsData={countriesData.features}
      // ... (le reste de vos props reste identique)
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
      polygonCapColor={() => "rgba(0, 0, 0, 0)"}
      polygonSideColor={() => "rgba(0, 0, 0, 0)"}
      polygonStrokeColor={() => "#ffffff60"}
      polygonAltitude={0.01}
    />
  );
};

export default GlobeView;
