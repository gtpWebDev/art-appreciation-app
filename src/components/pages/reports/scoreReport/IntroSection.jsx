import { useContext } from "react";

// Material UI components
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// Subcomponents
import { CompositeLinkPrimaryUnderline } from "../../../styledComponents/links";
import LoadingCircle from "../../../composites/LoadingCircle";

// context
import ScoreReportContext from "./ScoreReport";

const IntroSection = () => {
  // const { loading, allOwnersData } = useContext(ScoreReportContext);

  return (
    <Paper elevation={6}>
      <Grid container>
        <Grid size={12}>
          <Typography variant="h4" pt={2}>
            Intro...
          </Typography>
        </Grid>

        <Grid
          container
          size={6}
          rowSpacing={{ xs: 1, md: 2 }}
          columnSpacing={0}
        >
          <Grid size={12} align="left" p={2}>
            <Typography variant="body1">
              Each account owner has been scored based on their buying and
              selling habits across all of their accounts - based on whether
              they appeared to buy to keep and enjoy, or to sell for profit.
            </Typography>
            <Typography variant="body1">
              Estimating intent isn't easy(!), but how this was done can be
              found&nbsp;
              <CompositeLinkPrimaryUnderline linkLoc="/methodPage">
                here
              </CompositeLinkPrimaryUnderline>
              .
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          size={6}
          rowSpacing={{ xs: 1, md: 2 }}
          columnSpacing={0}
        >
          {/* {loading ? (
            <LoadingCircle />
          ) : (
            <Grid size={12} align="center" p={2}>
              <Typography variant="body1">
                Add in an overall chart here - total spend, art spend, speculate
                spend
              </Typography>
            </Grid>
          )} */}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default IntroSection;
