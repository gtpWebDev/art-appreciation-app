// Material UI components
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// subcomponents
import ReportHeader from "../../composites/ReportHeader";
import ScoreCalculationSection from "./ScoreCalculationSection";

const MethodPage = () => {
  return (
    <Grid container spacing={2} align="center">
      <Grid size={12} mb={1}>
        <ReportHeader headerText="Method Page" />
      </Grid>
      <MethodSections />
    </Grid>
  );
};

const MethodSections = () => {
  return (
    <>
      <Paper elevation={6}>
        <Grid container size={12} rowSpacing={1} columnSpacing={0}>
          <ScoreCalculationSection />
        </Grid>
      </Paper>

      <Paper elevation={6}>
        <Grid container size={12} rowSpacing={1} columnSpacing={0}>
          <Grid container size={12}>
            <Grid size={12}>Section on data and teztok?</Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default MethodPage;
