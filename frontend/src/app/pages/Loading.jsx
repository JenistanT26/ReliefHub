import { Loader2 } from "lucide-react";

export default function PageLoader({
  title = "Loading Data",
  subtitle = "Fetching latest information..."
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        
        {/* Loader Icon */}
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 max-w-md">
          {subtitle}
        </p>

      </div>
    </div>
  );
}