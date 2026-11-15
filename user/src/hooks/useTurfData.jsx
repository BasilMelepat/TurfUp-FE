import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurfs, setLoading, setError } from "../redux/slices/turfSlice";
import axiosInstance from "./useAxiosInstance";

const STALE_MS = 60_000;
let lastFetched = 0;

const useTurfData = () => {
  const dispatch = useDispatch();
  const { turfs, loading, error } = useSelector((state) => state.turf);

  useEffect(() => {
    if (turfs.length && Date.now() - lastFetched < STALE_MS) return;
    let cancelled = false;

    (async () => {
      try {
        if (!turfs.length) dispatch(setLoading(true));
        const { data } = await axiosInstance.get("/api/user/turf/all");
        if (cancelled) return;
        dispatch(setTurfs(data.turfs));
        dispatch(setError(null));
        lastFetched = Date.now();
      } catch (err) {
        if (!cancelled) dispatch(setError(err.message));
      } finally {
        if (!cancelled) dispatch(setLoading(false));
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { turfs, loading, error };
};

export default useTurfData;
