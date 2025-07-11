import React from "react";
import Globe from "react-globe.gl";

const GlobeView = () => {
  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundColor="rgba(0,0,0,0)"
      // Prépare les props quand tu en auras besoin
    />
  );
};

export default GlobeView;