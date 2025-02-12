import { useState } from "react";
import PlaceService from "../../services/PlaceService";

const usePlaceActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPlace = async (data) => {
    setLoading(true);
    try {
      const response = await PlaceService.create(data);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const updatePlace = async (id, data) => {
    setLoading(true);
    try {
      const response = await PlaceService.update(id, data);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const deletePlace = async (id) => {
    setLoading(true);
    try {
      const response = await PlaceService.delete(id);
      return response;
    } finally {
      setLoading(false);
    }
  };

  return { createPlace, updatePlace, deletePlace, loading, error };
};

export default usePlaceActions;
