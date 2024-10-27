import { useState, useEffect } from "react";
import { axiosGet } from "../lib/axiosUtility";

/**
 * Custom hook for data collection of information from two backend endpoints
 * Paginated transaction data, triggered by the prop.
 * Overall transaction count once only
 * - slowish query so will accept total only being accurate on first call
 */

const useGetStickyTableData = (
  relativeDataUri,
  relativeCountUri,
  updateTrigger
) => {
  const [count, setCount] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch both count and data on first call
  useEffect(() => {
    const getData = async () => {
      try {
        const [transactions, count] = await Promise.all([
          axiosGet(relativeDataUri),
          axiosGet(relativeCountUri),
        ]);
        setCount(count.data);
        setData(transactions.data);
      } catch (error) {
        // promise throws error if either fail
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // update transactionData on subsequent calls
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosGet(relativeDataUri);
        if (response.success) {
          setData(response.data);
        } else {
          setError(response.error);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (count) getData();
  }, [updateTrigger]);

  return { count, data, error, loading };
};

export default useGetStickyTableData;
