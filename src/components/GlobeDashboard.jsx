import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import "../styles/GlobeDashboard.scss";

export default function GlobeDashboard() {
  const globeRef = useRef();

  useEffect(() => {
    const globe = Globe()(globeRef.current)
      .width(320)
      .height(320)
      .backgroundColor("rgba(0,0,0,0)")
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
      .showGraticules(false)
      .showAtmosphere(true)
      .atmosphereColor("#3cffe6")
      .atmosphereAltitude(0.13)
      .pointOfView({ lat: 30, lng: 25, altitude: 2.1 })
      .enablePointerInteraction(false);

    globe.controls().enableZoom = false;
    globe.controls().enablePan = false;
    globe.controls().enableRotate = false;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.55;
    globe.controls().update();

    return () => {};
  }, []);

  return (
    <div
      ref={globeRef}
      className="dashboard-globe-canvas"
    ></div>
  );
}