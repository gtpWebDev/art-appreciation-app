// Material UI components
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

// Styled components
import { ReversePaper } from "../styledComponents/paper";

const ReportHeader = ({ headerText }) => {
  return (
    <ReversePaper elevation={6} sx={{ alignItems: "center" }}>
      <Typography
        component="h3"
        variant="h3"
        color="primary.contrastText"
        sx={{ padding: "20px 0" }}
        align="center"
      >
        {headerText}
      </Typography>
      {/* Remove when design complete */}
      <Grid
        size={12}
        color="black"
        backgroundColor={{
          xs: "red",
          sm: "orange",
          md: "yellow",
          lg: "green",
          xl: "purple",
        }}
        mb={3}
      >
        xs red, sm orange, md yellow, lg green, xl purple
      </Grid>
    </ReversePaper>
  );
};

export default ReportHeader;
