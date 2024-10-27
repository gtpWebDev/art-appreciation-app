import { useState, useEffect } from "react";
import { axiosGet } from "../lib/axiosUtility";

/**
 * Custom hook for single endpoint get requests to the backend server
 * Receives an optional updateTrigger, usually a timestamp using Date.now()
 */

const useGetBackendData = (relativeUri, updateTrigger) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosGet(relativeUri);
        if (response.success) {
          setData(response.data);
          console.log("Received response from useGetBackendData", response);
        } else {
          setError(response.error);
        }
      } catch (error) {
        // console.log("Custom hook returning unhandled response");
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [relativeUri, updateTrigger]);

  return { data, error, loading };
};

export default useGetBackendData;
