import { createContext, useState } from "react";

/**
 * The headline report cache context is used to store the data collected
 * by each chapter. Since the chapters are added to / removed from the DOM when
 * they move on and off screen, this more global context is necessary to preserve
 * the chapter data, ensuring it only needs to be collected once.
 *
 * Note, collecitng the data only once has been chosen because this is largely
 * a historic report, with the data only changing daily, hence there is no need
 * to always have absolutely current information.
 */

const HeadlineReportCacheContext = createContext();

export const HeadlineReportCacheProvider = ({ children }) => {
  const [cache, setCache] = useState({});

  // setter function, where the key will be the endpoint used in each chapter
  const setCachedData = (endpoint, data) => {
    setCache((prevCache) => ({
      ...prevCache,
      [endpoint]: data,
    }));
  };

  // getter function for specific endpoint
  const getCacheData = (endpoint) => cache[endpoint];

  return (
    <HeadlineReportCacheContext.Provider
      value={{ cache, setCachedData, getCacheData }}
    >
      {children}
    </HeadlineReportCacheContext.Provider>
  );
};

export default HeadlineReportCacheContext;
