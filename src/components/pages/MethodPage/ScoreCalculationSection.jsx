// Material UI components
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const ScoreCalculationSection = () => {
  return (
    <>
      <Grid container size={12} rowSpacing={{ xs: 1, md: 2 }} columnSpacing={0}>
        <Grid size={12}>
          <Typography variant="h4" pt={2}>
            Score Calculation
          </Typography>
        </Grid>
        <PurchaseCycleScores />
        <AccountScores />
      </Grid>
    </>
  );
};

const PurchaseCycleScores = () => {
  return (
    <>
      <Grid size={12} align="center" p={2}>
        <Typography variant="h5">
          Transactions in the purchase cycle of an NFT
        </Typography>
      </Grid>
      <Grid size={12} align="center" p={2}>
        <Typography variant="body1">Content</Typography>
      </Grid>
    </>
  );
};

const AccountScores = () => {
  return (
    <>
      <Grid size={12} align="center" p={2}>
        <Typography variant="h5">Score for a single account owner</Typography>
      </Grid>
      <AccountStage1 />
      <AccountStage2 />
      <AccountStage3 />
      <AccountStage4 />
    </>
  );
};

const AccountStage1 = () => {
  return (
    <>
      <Grid
        size={{ xs: 12, md: 6, lg: 3 }}
        align="center"
        p={2}
        container
        sx={{ minHeight: "300px" }}
      >
        <Grid size={12} sx={{ minHeight: "300px", backgroundColor: "yellow" }}>
          <Paper elevation={2}>Stage 1 - total spend</Paper>
        </Grid>
      </Grid>
    </>
  );
};

const AccountStage2 = () => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6, lg: 3 }} align="center" p={2} container>
        <Grid size={12}>
          <Paper elevation={2}>
            Stage 2 - separate art spend and speculate spend
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const AccountStage3 = () => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6, lg: 3 }} align="center" p={2} container>
        <Grid size={12}>
          <Paper elevation={2}>
            Stage 3 - subtract speculate spend from art spend
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const AccountStage4 = () => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6, lg: 3 }} align="center" p={2} container>
        <Grid size={12}>
          <Paper elevation={2}>Stage 4 - final account score</Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ScoreCalculationSection;
