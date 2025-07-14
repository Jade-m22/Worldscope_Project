// src/components/Globe.jsx

import React from "react";
import Globe from "react-globe.gl";

// 1. On s'assure que le composant accepte "onMarkerClick" en plus de "data"
const GlobeView = ({ data, onMarkerClick }) => {
  // 2. On définit la fonction qui sera appelée au clic sur un point
  const handlePointClick = (event) => {
    // La fonction onMarkerClick attend l'INDEX de l'événement,
    // mais le globe nous donne l'OBJET événement complet.
    // On doit donc trouver l'index de notre événement dans le tableau de données.
    const eventIndex = data.findIndex((e) => e.title === event.title);

    // Si on a bien trouvé l'index et que la fonction existe, on l'appelle
    if (eventIndex !== -1 && onMarkerClick) {
      onMarkerClick(eventIndex);
    }
  };

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundColor="rgba(0,0,0,0)"
      pointsData={data}
      // Configuration des points
      pointLat={(event) => event.position[0]}
      pointLng={(event) => event.position[1]}
      pointLabel={(event) => event.title}
      pointColor={(event) => {
        switch (event.type) {
          case "Conflit":
            return "rgba(255, 0, 0, 0.7)"; // Rouge pour les conflits
          case "À visiter":
            return "rgba(0, 255, 0, 0.7)"; // Vert pour "À visiter"
          case "Dangereux":
            return "rgba(255, 165, 0, 0.7)"; // Orange pour "Dangereux"
          default:
            return "rgba(100, 100, 255, 0.7)"; // Bleu par défaut
        }
      }}
      pointRadius={0.5}
      // 3. On lie notre fonction à l'événement de clic du globe
      onPointClick={handlePointClick}
    />
  );
};

export default GlobeView;
