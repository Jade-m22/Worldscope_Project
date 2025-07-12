import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";

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
      .enablePointerInteraction(false); // Désactive tout drag/zoom

    // Pas de drag, pas de zoom
    globe.controls().enableZoom = false;
    globe.controls().enablePan = false;
    globe.controls().enableRotate = false;

    // Rotation automatique
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.55;
    globe.controls().update();

    return () => {};
  }, []);

  return (
    <div
      ref={globeRef}
      style={{
        width: 320,
        height: 320,
        borderRadius: "50%",
        overflow: "hidden",
        background: "none",
        boxShadow: "0 8px 80px #37ffb822, 0 1px 24px #0c2a1766",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    ></div>
  );
}