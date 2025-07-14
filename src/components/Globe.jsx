// src/components/Globe.jsx

import React from "react";
import Globe from "react-globe.gl";

const GlobeView = ({ data }) => {
  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundColor="rgba(0,0,0,0)"
      pointsData={data}
      // --- CORRECTIONS BASÉES SUR VOS DONNÉES ---

      // On lit la latitude (premier élément du tableau "position")
      pointLat={(event) => event.position[0]}
      // On lit la longitude (deuxième élément du tableau "position")
      pointLng={(event) => event.position[1]}
      // On lit le nom de l'événement depuis la propriété "title"
      pointLabel={(event) => event.title}
      // On peut maintenant rendre la couleur dynamique selon le type !
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
    />
  );
};

export default GlobeView;
