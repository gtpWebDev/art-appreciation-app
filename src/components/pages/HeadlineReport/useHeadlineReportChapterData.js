import { useState, useEffect, useContext } from "react";

import { axiosGet } from "../../../lib/axiosUtility";

// context
import HeadlineReportCacheContext from "./HeadlineReportCacheContext";

/**
 * A straight forward custom hook to collect API data from an endpoint on the
 * backend, BUT IT IS MUST BE LOCATED WITHIN THE HEADLINE REPORT CACHE CONTEXT.
 * It checks whether the headlineReportCacheContext holds data for the endpoint
 * being requested. If it does, it uses that. If it doesn't, it collects the
 * data from the backend endpoint.
 *
 * - It is basically a once only collection of the endpoint data.
 */

const useHeadlineReportChapterData = (endpoint) => {
  const { cache, setCachedData } = useContext(HeadlineReportCacheContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (cache[endpoint]) {
          // data for endpoint already exists in headline report context
          console.log(`Context collection for endpoint ${endpoint}.`);
          setData(cache[endpoint]);
        } else {
          // doesn't exist, collect from API
          setLoading(true);
          const response = await axiosGet(endpoint);
          if (response.success) {
            // update headline report context and this hook data
            console.log(`API collection for endpoint ${endpoint}.`);
            setData(response.data);
            setCachedData(endpoint, response.data);
          } else {
            setError(response.error);
          }
        }
      } catch (error) {
        // console.log("Custom hook returning unhandled response");
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // early exit if no endpoint data required
    if (!endpoint) {
      setData(null);
      setLoading(false);
    } else {
      getData();
    }
  }, [endpoint]);

  return { data, loading, error };
};

export default useHeadlineReportChapterData;
