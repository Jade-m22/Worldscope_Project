import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";

const globeImageUrl = "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const countriesUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

const CesiumGlobe = ({ data = [], onMarkerClick, onCountryClick }) => {
  const globeEl = useRef();
  const [countries, setCountries] = useState([]);

  // Zoom params en kilomètres
  const MIN_ZOOM = 200;
  const MAX_ZOOM = 600;

  useEffect(() => {
    fetch(countriesUrl)
      .then(res => res.json())
      .then(geojson => setCountries(geojson.features));
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.2;
      globeEl.current.controls().enableZoom = true;
      globeEl.current.controls().minDistance = MIN_ZOOM;
      globeEl.current.controls().maxDistance = MAX_ZOOM;
    }
  }, [countries]);

  // Quand on clique sur un pays
  const handleCountryClick = (country) => {
    if (!country.properties || !country.properties.name) return;
    if (typeof onCountryClick === "function") {
      onCountryClick(country.properties.name);
    } else {
      alert(`Pays sélectionné : ${country.properties.name}`);
    }
  };

  // Quand on clique sur un marker/événement
  const handlePointClick = (event) => {
    if (typeof onMarkerClick === "function") {
      onMarkerClick(event);
    }
  };

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
        onPointClick={handlePointClick}
        polygonsData={countries}
        polygonCapColor={() => "rgba(255,255,255,0.04)"}
        polygonSideColor={() => "rgba(0,0,0,0.02)"}
        polygonStrokeColor={() => "#ffffff"}
        polygonStrokeWidth={0.6}
        polygonLabel={d => d.properties && d.properties.name}
        onPolygonClick={handleCountryClick}
      />
    </div>
  );
};

export default CesiumGlobe;