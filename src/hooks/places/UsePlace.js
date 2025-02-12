import { useState, useEffect } from "react";
import PlaceService from "../../services/PlaceService";

const UsePlace = (id) => {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPlace = async () => {
      const response = await PlaceService.getById(id);
      if (response.success) {
        setPlace(response.data);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchPlace();
  }, [id]);

  return { place, loading, error };
};

export default UsePlace;
