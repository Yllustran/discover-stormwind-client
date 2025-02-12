import { useState, useEffect } from "react";
import PlaceService from "../../services/PlaceService";

const UsePlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await PlaceService.getAll();
      if (response.success) {
        setPlaces(response.data);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchPlaces();
  }, []);

  return { places, loading, error, setPlaces };
};

export default UsePlaces;
