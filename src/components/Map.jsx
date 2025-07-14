import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import countryToCode from "../utils/countryCodes";
import FlagOrEmoji from "../utils/FlagOrEmoji";
import { subcategoryColors, markerColors } from "../utils/colors";

// Génère un marker SVG coloré
function createColoredPinMarker(color) {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="44" viewBox="0 0 32 44">
        <path d="M16 44C16 44 30 27 30 18C30 8.05887 23.9411 2 16 2C8.05887 2 2 8.05887 2 18C2 27 16 44 16 44Z"
          fill="${color}" stroke="#fff" stroke-width="2"/>
        <circle cx="16" cy="18" r="7" fill="#fff" opacity="0.20"/>
      </svg>
    `,
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -40]
  });
}

// Fix pour les icônes leaflet par défaut
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Fly-to + ouverture popup
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

// Composant Map principal
const Map = forwardRef(function Map({ data, selected, setSelected, onShowDetail }, ref) {
  const markersRef = useRef([]);

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
          eventHandlers={{ click: () => setSelected(i) }}
          icon={createColoredPinMarker(
            subcategoryColors[m.subcategory] ||
            markerColors[m.status] ||
            markerColors[m.type] ||
            "#4deed6"
          )}
        >
          <Popup>
            <div className="map-popup">
              <div className="map-popup-title">
                <FlagOrEmoji code={countryToCode[m.country]} size="1.7em" />
                {m.title}
              </div>
              <div className="map-popup-meta">
                {m.country} &middot; {m.year}
              </div>
              <div className="map-popup-desc">{m.desc}</div>
              <div className="map-popup-coords">
                Lat: {m.position[0].toFixed(3)}, Lon: {m.position[1].toFixed(3)}
              </div>
              {onShowDetail && (
                <button
                  className="map-popup-detail-btn"
                  onClick={() => onShowDetail(i)}
                >
                  Voir plus de détails
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      <MapFlyAndPopup selected={selected} markersRef={markersRef} />
    </MapContainer>
  );
});

export default Map;
