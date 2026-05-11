import { useState, useEffect } from "react";

export default function useReverseGeocoding(lat, lng) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;

    const fetchAddress = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await res.json();
        setAddress(data.display_name || "");
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [lat, lng]);

  return { address, loading, error };
}