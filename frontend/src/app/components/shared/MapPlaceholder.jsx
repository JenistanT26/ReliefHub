import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import { MapPin } from "lucide-react";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Fix map rendering issues (modals, hidden divs)
function FixMapSize() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });

    resizeObserver.observe(container);

    // Initial fix
    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      resizeObserver.disconnect();
    };
  }, [map]);

  return null;
}

// Auto move + zoom when location changes
function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 13);
  }, [position, map]);

  return null;
}

// Handle clicks + dragging
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return (
    <Marker
      position={position}
      draggable
      icon={markerIcon}
      eventHandlers={{
        dragend: (e) => {
          const latlng = e.target.getLatLng();
          setPosition([latlng.lat, latlng.lng]);
        },
      }}
    />
  );
}

export default function MapPlaceholder({
  location,
  onLocationChange,
  className = "",
}) {
  const defaultPos = [
    location?.lat || 13.0827,
    location?.lng || 80.2707,
  ];

  const [position, setPosition] = useState(defaultPos);
  const [address, setAddress] = useState("");

  // Sync external updates
  useEffect(() => {
    if (location?.lat && location?.lng) {
      setPosition([location.lat, location.lng]);
    }
  }, [location]);

  // Reverse geocoding (lat/lng → address)
  const fetchAddress = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      setAddress(data.display_name || "");
    } catch (err) {
      console.error(err);
    }
  };

  const updateLocation = (coords) => {
    setPosition(coords);

    onLocationChange?.({
      lat: coords[0],
      lng: coords[1],
    });

    fetchAddress(coords[0], coords[1]);
  };

  // GPS button
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (res) => {
        const coords = [res.coords.latitude, res.coords.longitude];
        updateLocation(coords);
      },
      () => alert("Unable to fetch location")
    );
  };

  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom
        className="h-64 w-full"
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FixMapSize />
        <RecenterMap position={position} />

        <LocationMarker
          position={position}
          setPosition={updateLocation}
        />
      </MapContainer>

      {/* Bottom info panel */}
      <div className="p-3 bg-white border-t space-y-1">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            {position[0].toFixed(4)}, {position[1].toFixed(4)}
          </div>

          <button
            onClick={getCurrentLocation}
            className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
          >
            Use My Location
          </button>
        </div>

        {address && (
          <p className="text-xs text-gray-500 truncate">
            {address}
          </p>
        )}
      </div>
    </div>
  );
}