import { useState, useEffect } from "react";
import { axiosGet } from "../lib/axiosUtility";

/**
 * Custom hook for all get requests to the backend server
 */

const useGetFxSummaryData = () => {
  const fxStatsEndpoint = "/fxStats";
  const purchasesByMonthEndpoint = `/purchases/by-month`;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // REVIEW ERROR HANDLING IN LIGHT OF ADDING PROMISE ALL

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("Collecting FX Summary Page Data - process begun");

        const [fxStatsResponse, purchasesByMonthResponse] = await Promise.all([
          axiosGet(fxStatsEndpoint),
          axiosGet(purchasesByMonthEndpoint),
        ]);

        const fullResponse = {
          fxStats: fxStatsResponse.data,
          purchasesByMonth: purchasesByMonthResponse.data,
        };

        setData(fullResponse);
      } catch (error) {
        // need to deal with network error and captured error
        console.log(
          "Captured error trying to get backend fxSummaryData",
          error
        );
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { data, error, loading };
};

export default useGetFxSummaryData;
