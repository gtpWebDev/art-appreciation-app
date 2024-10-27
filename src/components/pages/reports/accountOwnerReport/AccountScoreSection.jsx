import { createContext, useContext, useState, useEffect } from "react";

// Material UI components
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// subcomponents
import LoadingCircle from "../../../composites/LoadingCircle";
import VerticalRangeDisplay from "../../../composites/VerticalRangeDisplay";
import RankingTable from "../../../composites/RankingTable";

// context
import { AccountOwnerContext } from "./AccountOwnerReport";

// custom hook for account score data
import useAccountScores from "./useAccountScores";

const AccountScoreContext = createContext();

const ScoresSection = () => {
  // Collect account from context
  const { accountOwner } = useContext(AccountOwnerContext);

  return (
    <AccountScoresProvider ownerId={accountOwner.id}>
      <Paper elevation={6}>
        <Grid
          container
          size={12}
          rowSpacing={{ xs: 1, md: 2 }}
          columnSpacing={0}
          sx={{ pb: 2 }}
        >
          <SectionHeader />
          <SectionContent />
        </Grid>
      </Paper>
    </AccountScoresProvider>
  );
};

const SectionContent = () => {
  const { loading } = useContext(AccountScoreContext);

  return (
    <>
      {loading ? (
        <FormattedLoadingCircle />
      ) : (
        <Grid container size={12} rowSpacing={{ xs: 1, md: 2 }}>
          <Grid
            size={{ xs: 12, md: 6, lg: 4 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ScoreRange />
          </Grid>
          <Grid
            container
            size={{ xs: 12, md: 6, lg: 8 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            rowSpacing={2}
          >
            <ScoreTables />
          </Grid>
        </Grid>
      )}
    </>
  );
};

const ScoreRange = () => {
  const { ownerScores } = useContext(AccountScoreContext);

  return (
    <Grid container p={2}>
      <Grid align="left">
        <Typography variant="h6" align="center">
          Spend Balance
        </Typography>
        <Typography
          variant="body2"
          sx={{ pb: 1, px: 1, fontStyle: "italic", maxWidth: "400px" }}
        >
          A reflection of the balance of keeping and appreciating art vs. trying
          to sell it for profit...
        </Typography>
        <VerticalRangeDisplay
          rangeDisplayMax={ownerScores.total_purchase_value_usd}
          dataPoint={ownerScores.total_score_usd}
        />
      </Grid>
    </Grid>
  );
};

// Provider component which executes the custom hook when called
const AccountScoresProvider = ({ ownerId, children }) => {
  // execute the custom hook, make it available to the provider
  const filterValues = useAccountScores(ownerId);
  return (
    <AccountScoreContext.Provider value={filterValues}>
      {children}
    </AccountScoreContext.Provider>
  );
};

const SectionHeader = () => {
  return (
    <Grid size={12}>
      <Typography variant="h4" pt={2}>
        Account Scores
      </Typography>
    </Grid>
  );
};

/**
 * lg and xl - two tables side-by-side
 * md - top and bottom, need to restrict height to format similar height
 *      to ScoreRange component.
 * sm and xs no such issues, just simple top and bottom
 */
const ScoreTables = () => {
  return (
    <>
      <Grid
        size={{ xs: 12, lg: 6 }}
        sx={{
          minHeight: { lg: 365 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 0, lg: 0 },
        }}
        container
      >
        <Grid align="center">
          <Typography variant="h6">"Art Appreciation" Spend</Typography>
          <Typography
            variant="body2"
            sx={{
              fontStyle: "italic",
              pb: 3,

              display: { xs: "table-cell", md: "none", lg: "table-cell" }, // removed for md screen
            }}
          >
            Money spent on art with an intent to keep
          </Typography>
          <TopArtTable />
        </Grid>
      </Grid>
      <Grid
        size={{ xs: 12, lg: 6 }}
        sx={{
          minHeight: { lg: 365 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 0, lg: 2 },
        }}
        container
      >
        <Grid align="center">
          <Typography variant="h6">"Speculator" Spend</Typography>
          <Typography
            variant="body2"
            sx={{
              fontStyle: "italic",
              pb: 3,
              display: { xs: "table-cell", md: "none", lg: "table-cell" }, // removed for md screen
            }}
          >
            Money spent on art with an intent to sell
          </Typography>
          <TopSpeculateTable />
        </Grid>
      </Grid>
    </>
  );
};

const TopArtTable = () => {
  const { topArtOwners, ownerScores, artRank, speculateRank } =
    useContext(AccountScoreContext);

  const ownerData = { ...ownerScores, artRank, speculateRank };

  return (
    <>
      <Grid>
        <RankingTable
          rankData={topArtOwners}
          ownerData={ownerData}
          isArtSpend={true} // for now can present 'art_dollars' or 'speculate_dollars'
        />
      </Grid>
    </>
  );
};

const TopSpeculateTable = () => {
  const { topSpeculateOwners, ownerScores, artRank, speculateRank } =
    useContext(AccountScoreContext);

  const ownerData = { ...ownerScores, artRank, speculateRank };

  return (
    <Grid sx={{ backgroundColor: "blue" }}>
      <RankingTable
        rankData={topSpeculateOwners}
        ownerData={ownerData}
        isArtSpend={false} // for now can present 'art_dollars' or 'speculate_dollars'
      />
    </Grid>
  );
};

// look at final formatting need and likely move to styledComponents
const FormattedLoadingCircle = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="200px"
      width="100%"
    >
      <LoadingCircle />
    </Box>
  );
};

export default ScoresSection;
