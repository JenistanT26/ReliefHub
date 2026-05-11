import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useEffect, useCallback } from "react";
import { MapPin } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "16rem",
};

export default function MapPlaceholder({
  location,
  onLocationChange,
  className = "",
}) {
  // Default = Chennai
  const defaultPos = {
    lat: location?.lat || 13.0827,
    lng: location?.lng || 80.2707,
  };

  const [position, setPosition] = useState(defaultPos);
  const [address, setAddress] = useState("");
  const [map, setMap] = useState(null);

  // Load Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Sync external location updates
  useEffect(() => {
    if (location?.lat && location?.lng) {
      setPosition({
        lat: location.lat,
        lng: location.lng,
      });
    }
  }, [location]);

  // Auto move map
  useEffect(() => {
    if (map) {
      map.panTo(position);
      map.setZoom(13);
    }
  }, [position, map]);

  // Reverse geocoding
  const fetchAddress = async (lat, lng) => {
    try {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode(
        {
          location: { lat, lng },
        },
        (results, status) => {
          if (status === "OK" && results[0]) {
            setAddress(results[0].formatted_address);
          }
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Update location
  const updateLocation = (coords) => {
    setPosition(coords);

    onLocationChange?.({
      lat: coords.lat,
      lng: coords.lng,
    });

    fetchAddress(coords.lat, coords.lng);
  };

  // Click on map
  const handleMapClick = useCallback((e) => {
    updateLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  }, []);

  // GPS
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (res) => {
        updateLocation({
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        });
      },
      () => alert("Unable to fetch location")
    );
  };

  if (!isLoaded) {
    return <p>Loading Map...</p>;
  }

  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={13}
        onLoad={(mapInstance) => setMap(mapInstance)}
        onClick={handleMapClick}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker
          position={position}
          draggable
          onDragEnd={(e) =>
            updateLocation({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            })
          }
        />
      </GoogleMap>

      {/* Bottom Info */}
      <div className="p-3 bg-white border-t space-y-1">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
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