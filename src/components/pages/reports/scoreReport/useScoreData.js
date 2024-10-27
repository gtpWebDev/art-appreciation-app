import { useState, useEffect } from "react";

// utility
import { axiosGet } from "../../../../lib/axiosUtility";
import { summariseOwnerSpend } from "../../../../utils/chartConstruction";

/**
 * Local, page-specific hook with a single request and generation of 3 data arrays
 * through aggregation
 */

const useScoreData = () => {
  const [bucketData, setBucketData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [allOwnersData, setAllOwnersData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosGet(
          `score/spend_split_account_buckets?bucketsize=100`
        );

        if (response.success) {
          // aggregate data
          const { allOwnersSummary, spendCategorySummary } =
            summariseOwnerSpend(response.data);
          setCategoryData(spendCategorySummary);
          setAllOwnersData(allOwnersSummary);
          // Grouped 100 owner data - original endpoint response
          setBucketData(response.data);
        } else {
          setError(response.error);
        }
      } catch (error) {
        console.error("Score Data not available", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return {
    allOwnersData,
    categoryData,
    bucketData,
    error,
    loading,
  };
};

export default useScoreData;
