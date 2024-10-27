import { useState, createContext, useContext } from "react";

// Material UI components
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

// Subcomponents
import ReportHeader from "../../../composites/ReportHeader";
import TopLevelSection from "./TopLevelSection";
import IntroSection from "./IntroSection";
import LoadingCircle from "../../../composites/LoadingCircle";
import AccountOwnerFilter from "../../../composites/AccountOwnerFilter";
import CategorySection from "./CategorySection";
import ProfileSection from "./ProfileSection";
import MonthlyScoresSection from "./MonthlyScoresSection";

// Styled components
import { CompositeLinkPrimaryUnderline } from "../../../styledComponents/links";

// context for score report - account id and score data
import { ScoreReportProvider, ScoreReportContext } from "./scoreReportContext";

const ScoreReport = () => {
  // The score report provider contains a custom hook to collect the score data,
  // and includes a function and property to manage an account owner id

  return (
    <ScoreReportProvider>
      <Grid container spacing={2} align="center">
        <Grid size={12} mb={1}>
          <ReportHeader headerText="Scores Report" />
        </Grid>
        <Grid size={12}>
          <IntroText />
        </Grid>

        <ScoreReportContent />
      </Grid>
    </ScoreReportProvider>
  );
};

const ScoreReportContent = () => {
  const { loading, setAccountOwner } = useContext(ScoreReportContext);

  if (loading) return <LoadingCircle />;

  return (
    <>
      <AccountOwnerFilter setAccountOwner={setAccountOwner} />
      <Grid size={12}>
        <TopLevelSection />
      </Grid>
      <Grid size={12}>
        <CategorySection />
      </Grid>
      <Grid size={12}>
        <ProfileSection />
      </Grid>
      {/* <Grid size={12}>
        <MonthlyScoresSection />
      </Grid> */}
    </>
  );
};

const IntroText = () => {
  return (
    <Paper elevation={6}>
      <Grid container>
        <Grid size={12}>
          <Typography variant="h5" pt={2}>
            A note on scores for owners of accounts...
          </Typography>
        </Grid>

        <Grid
          container
          size={12}
          rowSpacing={{ xs: 1, md: 2 }}
          columnSpacing={0}
        >
          <Grid size={12} align="left" p={2}>
            <Typography variant="body1">
              Each account owner has been scored based on their buying and
              selling habits across all of their accounts - specifically,
              whether they appear to buy to collect and enjoy the art, or
              whether they buy to sell for profit. But... estimating intent
              isn't easy! If you want to understand better how the scores were
              constructed, the details can be found&nbsp;
              <CompositeLinkPrimaryUnderline linkLoc="/methodPage">
                here
              </CompositeLinkPrimaryUnderline>
              .
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ScoreReport;
