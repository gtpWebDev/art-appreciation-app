// styles
import theme from "../../../theme";

// Material UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

// subcomponents
import ScrollTriggeredSection from "../../composites/ScrollTriggeredSection";

import WidthMonitor from "../../composites/WidthMonitor";

/**
 * Provides the layout for chapters across all report sections to ensure consistency:
 * - Header with a background image, full screen width
 * - Content below
 */

// Simple grid containing header and content
const ChapterPresentation = ({ chapter }) => {
  return (
    <Grid container rowSpacing={10}>
      <Grid size={12}>
        <ChapterHeader
          title={chapter.title}
          backgroundImage={chapter.headerBackgroundImage}
        />
        {/* Don't forget to remove!*/}
        <WidthMonitor />
      </Grid>
      <Grid size={12}>
        {/* SECTION SPACING, FURTHER PADDING AHEAD OF NEXT CHAPTER */}
        <chapter.contentComponent chapterEndpoint={chapter.backendEndpoint} />
      </Grid>
    </Grid>
  );
};

const ChapterHeader = ({ title, backgroundImage }) => {
  // alternatives should background image not be available
  const minHeight = backgroundImage ? "500px" : "150px";
  const backupBackgroundColor = theme.palette.headlineReport.darkBackground;

  return (
    <ScrollTriggeredSection visThreshold={0.3} transitionDuration={1.5}>
      <Box
        sx={{
          width: "100%",
          height: minHeight,
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: backgroundImage
            ? "transparent"
            : backupBackgroundColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: 900, textAlign: "center" }}
          color={"white"}
        >
          {title}
        </Typography>
      </Box>
    </ScrollTriggeredSection>
  );
};

export default ChapterPresentation;
