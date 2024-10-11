import { useState, useEffect } from "react";
import { axiosGet } from "../../../../lib/axiosUtility";

/**
 * Local, page-specific hook with multiple backend requests
 * Art dollar rank (also using for owner scores):
 * http://localhost:3000/score/owners/42124/rank?rankfield=art_dollars
 * Speculate dollar rank:
 * http://localhost:3000/score/owners/42124/rank?rankfield=speculate_dollars
 * Top ranked art dollar owners:
 * http://localhost:3000/score/owners/top-ranked?limit=3&rankfield=art_dollars
 * Top ranked speculate dollar owners:
 * http://localhost:3000/score/owners/top-ranked?limit=3&rankfield=speculate_dollars
 *
 */

const useAccountScores = (ownerId) => {
  const [ownerScores, setOwnerScores] = useState(null);
  const [artRank, setArtRank] = useState(null);
  const [speculateRank, setSpeculateRank] = useState(null);
  const [topArtOwners, setTopArtOwners] = useState(null);
  const [topSpeculateOwners, setTopSpeculateOwners] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const [artRank, speculateRank, topArtOwners, topSpeculateOwners] =
          await Promise.all([
            axiosGet(`/score/owners/${ownerId}/rank?rankfield=art_dollars`),
            axiosGet(
              `/score/owners/${ownerId}/rank?rankfield=speculate_dollars`
            ),
            axiosGet(`/score/owners/top-ranked?limit=3&rankfield=art_dollars`),
            axiosGet(
              `/score/owners/top-ranked?limit=3&rankfield=speculate_dollars`
            ),
          ]);

        // restructure the information
        const { rank, ...rest } = artRank.data[0]; // single line output
        setArtRank(rank);
        setOwnerScores(rest);
        setSpeculateRank(speculateRank.data[0].rank); // single line output
        setTopArtOwners(topArtOwners.data);
        setTopSpeculateOwners(topSpeculateOwners.data);
      } catch (error) {
        console.error("Account Scores information not available", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [ownerId]);

  return {
    ownerScores,
    artRank,
    speculateRank,
    topArtOwners,
    topSpeculateOwners,
    error,
    loading,
  };
};

export default useAccountScores;
