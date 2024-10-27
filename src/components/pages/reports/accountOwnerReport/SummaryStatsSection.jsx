import { useContext } from "react";

// Material UI components
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// subcomponents
import LoadingCircle from "../../../composites/LoadingCircle";
import FxhashOwnerLink from "../../../primitives/FxhashOwnerLink";
import StatsTable from "./StatsTable";

// utility
import { shortenAddress } from "../../../../utils/textFunctions";
import { formatDateTime } from "../../../../utils/formatting";

// context
import { AccountOwnerContext } from "./AccountOwnerReport";
import useGetBackendData from "../../../../hooks/useGetBackendData";

const SummaryStatsSection = () => {
  const { accountOwner } = useContext(AccountOwnerContext);

  const summaryStatsUrl = `/fxstats/owners/${accountOwner.id}`;
  const { data, error, loading } = useGetBackendData(summaryStatsUrl);

  if (loading) return <FormattedLoadingCircle />;

  return (
    <Grid container p={2}>
      <Grid align="left" p={2}>
        <Typography variant="body1">
          Account:&nbsp;
          <FxhashOwnerLink address={accountOwner.parent_address}>
            {shortenAddress(accountOwner.parent_address)}
          </FxhashOwnerLink>
        </Typography>
        <Typography variant="body2" sx={{ pb: 3, pl: 1, fontStyle: "italic" }}>
          - First seen {formatDateTime(accountOwner.first_seen)}
        </Typography>
        <StatsTable tableData={data} />
      </Grid>
    </Grid>
  );
};

const FormattedLoadingCircle = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="200px"
    >
      <LoadingCircle />
    </Box>
  );
};

export default SummaryStatsSection;
