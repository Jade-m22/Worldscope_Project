// src/components/Globe.jsx

import React from "react";
import Globe from "react-globe.gl";

const GlobeView = ({ data }) => {
  // TODO: Convertir les 'data' (tes événements) en points pour le globe

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundColor="rgba(0,0,0,0)"

      // On préparera ici les données pour les marqueurs du globe
      // pointsData={...}
      // pointLat={d => d.lat}
      // pointLng={d => d.lng}
    />
  );
};

export default GlobeView;
