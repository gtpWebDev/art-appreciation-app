import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { NormalPaper } from "../../styledComponents/paper";

import useGetFxSummaryData from "../../../hooks/useGetFxSummaryData";
import Loading from "../../composites/Loading";

const FxhashStatsSection = () => {
  const { data, error, loading } = useGetFxSummaryData();

  // useEffect(() => {
  //   const delayedFetch = async (url) => {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         // Simulate fetching data
  //         fetch(url)
  //           .then((response) => response.json())
  //           .then((data) => resolve(data))
  //           .catch((error) => console.error("Error fetching data:", error));
  //       }, 3000); // 3-second delay
  //     });
  //   };
  //   delayedFetch();
  // }, []);

  if (loading) return <Loading />;

  // Not authorised. Would like a tidier solution, but this does work
  if (error) return <p>error</p>;

  return (
    <NormalPaper elevation={6} sx={{ padding: "15px" }}>
      <Stack>
        <Typography component="h4" variant="h4" sx={{ padding: "20px 0" }}>
          Fxhash Summary Stats
        </Typography>
        <Typography
          component="body2"
          variant="body2"
          sx={{ padding: "10px 0", textAlign: "left" }}
        >
          <h3>Fx Summary Report</h3>
          <h4>Big numbers</h4>
          <p>Number of artists: {data.fxStats.artist_count}</p>
          <p>Number of collections: {data.fxStats.collection_count}</p>
          <p>Number of nfts: {data.fxStats.nft_count}</p>
          <p>Number of owners: {data.fxStats.owner_count}</p>
          <p>(Number of accounts: {data.fxStats.account_count})</p>
          <h4>Transactions:</h4>
          <p>Primary purchases: {data.fxStats.primary_purchase_count}</p>
          <p>Secondary purchases: {data.fxStats.secondary_purchase_count}</p>
          <p>Listings: {data.fxStats.listing_count}</p>
          <p>Delistings: {data.fxStats.delisting_count}</p>

          <h4>Monthly data</h4>
          {data.purchasesByMonth.map((element, index) => (
            <p key={index}>
              {element.transaction_month}/{element.transaction_year}:{" "}
              {element.count} {element.transaction_type}s
            </p>
          ))}
        </Typography>
      </Stack>
    </NormalPaper>
  );
};
export default FxhashStatsSection;
