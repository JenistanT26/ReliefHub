import { MapPin } from "lucide-react";

export default function MapPlaceholder({ location, className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center ${className}`}>
      <div className="text-center p-6">
        <MapPin className="w-12 h-12 mx-auto mb-3 text-blue-600" />
        <p className="font-medium text-gray-900">{location?.name || "Location"}</p>
        {location?.lat && location?.lng && (
          <p className="text-sm text-gray-500 mt-1">
            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-2">Map Integration Placeholder</p>
      </div>
    </div>
  );
}
