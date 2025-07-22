import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import "../styles/components/globeDashboard.scss";

export default function GlobeDashboard() {
  const globeRef = useRef();

  useEffect(() => {
    if (!globeRef.current) return;

    // Initialise le globe sans taille fixe ici
    const globe = Globe()(globeRef.current)
      .backgroundColor("rgba(0,0,0,0)")
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
      .showGraticules(false)
      .showAtmosphere(true)
      .atmosphereColor("#3cffe6")
      .atmosphereAltitude(0.13)
      .pointOfView({ lat: 30, lng: 25, altitude: 2.1 })
      .enablePointerInteraction(false);

    const controls = globe.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;
    controls.update();

    // Fonction de resize qui reprend la taille effective du conteneur
    const resize = () => {
      const size = globeRef.current.clientWidth;
      globe.width(size).height(size);
    };

    // Premier réglage
    resize();
    // Si l'utilisateur redimensionne la fenêtre
    window.addEventListener("resize", resize, { passive: true });
    return () =>
      window.removeEventListener("resize", resize, { passive: true });
  }, []);

  return <div ref={globeRef} className="dashboard-globe-canvas" />;
}