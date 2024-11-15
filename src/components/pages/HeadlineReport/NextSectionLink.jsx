import { Link as RouterLink } from "react-router-dom";

// material UI
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import theme from "../../../theme";

// subcomponents
import ScrollTriggeredSection from "../../composites/ScrollTriggeredSection";

// styled components
import { CompositeLink } from "../../styledComponents/links";

/**
 * Common format for final section providing link to next report page
 * The whole section is an active link
 */

export const NextSectionLink = ({ location, title }) => {
  const sectionHeight = 80;

  return (
    <ScrollTriggeredSection visThreshold={0.3} transitionDuration={1}>
      <CompositeLink linkLoc={location}>
        <Box
          sx={{
            width: "100%",
            height: sectionHeight,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            borderTop: "1px solid #410818",
            backgroundColor: theme.palette.secondary.main,
            paddingRight: "30px",
          }}
        >
          <Grid container direction="column">
            <Grid
              size={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Typography variant="body2" color="white">
                NEXT SECTION
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid
                size={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  lineHeight: 1.2,
                }}
              >
                <Typography
                  variant="h5"
                  color="white"
                  sx={{ fontStyle: "italic", lineHeight: 1.2 }}
                >
                  {title}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CompositeLink>
    </ScrollTriggeredSection>
  );
};
