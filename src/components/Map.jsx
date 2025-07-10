import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";

// Fix icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Permet d'ouvrir une popup programmatique (impératif)
function MapFlyAndPopup({ selected, markersRef }) {
  const map = useMap();

  useEffect(() => {
    if (selected !== null && markersRef.current[selected]) {
      const marker = markersRef.current[selected];
      marker.openPopup();
      map.setView(marker.getLatLng(), Math.max(map.getZoom(), 4), { animate: true });
    }
  }, [selected, map, markersRef]);

  return null;
}

// Main Map component
const Map = forwardRef(function Map({ data, selected, setSelected }, ref) {
  // Garde la référence sur tous les markers pour les popups
  const markersRef = useRef([]);

  // Permet à App de déclencher un flyTo
  useImperativeHandle(ref, () => ({
    flyToEvent: idx => {
      if (markersRef.current[idx]) {
        markersRef.current[idx].openPopup();
      }
    },
  }));

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      minZoom={2}
      maxZoom={6}
      scrollWheelZoom
      style={{
        height: "60vh",
        width: "100%",
        borderRadius: "18px",
        boxShadow: "0 4px 22px #11284277",
        marginBottom: 16,
      }}
      className="geoscope-map"
      maxBounds={[
        [85, -180],
        [-85, 180],
      ]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors, tiles: OpenStreetMap France"
      />
      {data.map((m, i) => (
        <Marker
          position={m.position}
          key={i}
          ref={el => (markersRef.current[i] = el)}
          eventHandlers={{
            click: () => setSelected(i),
          }}
        >
          <Popup>
            <div style={{ minWidth: 180 }}>
              <div style={{ fontSize: "1.1em", fontWeight: 700, marginBottom: 4 }}>
                {m.flag} {m.title}
              </div>
              <div style={{ color: "#5efef7" }}>
                {m.country} &middot; {m.year}
              </div>
              <div style={{ margin: "8px 0", fontSize: "0.97em" }}>{m.desc}</div>
              <div style={{ fontSize: "0.85em", color: "#aaa" }}>
                Lat: {m.position[0].toFixed(3)}, Lon: {m.position[1].toFixed(3)}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
      <MapFlyAndPopup selected={selected} markersRef={markersRef} />
    </MapContainer>
  );
});

export default Map;
