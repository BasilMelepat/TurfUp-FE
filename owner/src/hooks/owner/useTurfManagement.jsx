import { useState } from "react";
import axiosInstance from "../useAxiosInstance";

const useTurfManagement = () => {
  const [turfs, setTurfs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTurfs = async () => {
    setIsLoading(true);
    try {
      // Replace this with your actual API call
      const response = await axiosInstance.get("/api/owner/turf/all");
      const result = await response.data;
      setTurfs(result);
    } catch (err) {
      setError("Failed to fetch turfs");
    } finally {
      setIsLoading(false);
    }
  };

  const addTurf = async (newTurf) => {
    try {
      // Replace this with your actual API call
      const response = await fetch("/api/turfs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTurf),
      });
      const addedTurf = await response.json();
      setTurfs((prev) => [...prev, addedTurf]);
    } catch (err) {
      setError("Failed to add turf");
    }
  };

  const editTurf = async (updatedTurf, turfId) => {
    try {
      const response = await axiosInstance.put(
        `/api/owner/turf/${turfId}`,
        updatedTurf
      );
      const result = await response.data;
      setTurfs(result.allTurfs);
    } catch (error) {
      console.log(error, "error in edit turf");
    }
  };

  const deleteTurf = async (turfId) => {
    try {
      const response = await axiosInstance.delete(`/api/owner/turf/delete/${turfId}`);
      if (response.data.success) {
        setTurfs(response.data.allTurfs);
        return response.data;
      }
    } catch (err) {
      console.error('Delete turf error:', err);
      setError("Failed to delete turf");
      throw err;
    }
  };

  return {
    turfs,
    isLoading,
    error,
    fetchTurfs,
    addTurf,
    editTurf,
    deleteTurf,
  };
};

export default useTurfManagement;
