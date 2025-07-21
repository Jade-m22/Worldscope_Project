import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";

const globeImageUrl = "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const countriesUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

const CesiumGlobe = ({ data = [] }) => {
  const globeEl = useRef();
  const [countries, setCountries] = useState([]);

  // Fetch GeoJSON des frontières pays
  useEffect(() => {
    fetch(countriesUrl)
      .then(res => res.json())
      .then(geojson => {
        setCountries(geojson.features);
      });
  }, []);

  // Animation auto-rotation
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Globe
        ref={globeEl}
        globeImageUrl={globeImageUrl}
        backgroundColor="rgba(0,0,0,0)"
        pointsData={data}
        pointLat={event => event.lat}
        pointLng={event => event.lng}
        pointLabel={event => event.title}
        pointColor={event => event.color || "red"}
        pointRadius={0.6}

        polygonsData={countries}
        polygonCapColor={() => "rgba(255,255,255,0.05)"}
        polygonSideColor={() => "rgba(0,0,0,0.1)"}
        polygonStrokeColor={() => "#ffffff"}
        polygonStrokeWidth={0.6}
        polygonLabel={d => d.properties && d.properties.name}
      />
    </div>
  );
};

export default CesiumGlobe;