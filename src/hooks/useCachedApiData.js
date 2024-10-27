import { useState, useEffect, useRef } from "react";

import { axiosGet } from "../lib/axiosUtility";

/**
 * A straight forward custom hook to collect API data form the backend endpoint,
 * but utilising useRef to create a cache of the collected data so that it is only
 * collected once.
 * This will be used with a chapter context so that on first render of the chapter
 * it will collect all the required data, but as the chapter is added to / removed
 * from the DOM, it doesn't need to re-request the API data.
 */

const useCachedApiData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cache data across renders within this component
  const cache = useRef({});

  useEffect(() => {
    const getData = async () => {
      try {
        // Check if data is in the cache

        console.log(
          "Checking cache.current at start of custom hook:",
          cache.current
        );

        console.log(
          "Checking cache at start of custom hook:",
          cache.current[endpoint]
        );

        if (cache.current[endpoint]) {
          // if data is in the cache, do not recollect, assign it to the data
          console.log(`Cache collection for endpoint ${endpoint}.`);
          setData(cache.current[endpoint]);
        } else {
          // If not cached, fetch from API
          setLoading(true);
          const response = await axiosGet("/purchases/by-month");
          if (response.success) {
            // cache the result and assign it to the data
            cache.current[endpoint] = response.data; // Cache the result

            console.log(
              "Checking cache after it is added:",
              cache.current[endpoint]
            );

            setData(response.data);
            console.log(`API collection for endpoint ${endpoint}`);
          } else {
            setError(response.error);
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useCachedApiData;
