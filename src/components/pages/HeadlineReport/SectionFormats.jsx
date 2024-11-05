// material UI
// NO TYPOGRAPHY IN HERE, MUST USE HEADLINEREPORTITEMS TO ENSURE CONSISTENCY
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Grid";

// subcomponents
import ScrollTriggeredSection from "../../composites/ScrollTriggeredSection";
// import ScrollTriggeredSection from "./ScrollTriggeredSection";
import {
  PrimaryParagraphText,
  HeadlineReportPaperFrame,
  PrimaryParagraphHeader,
} from "../../primitives/headlineReportItems";

/**
 * Section format components to enable multiple instances of typical types of
 * format of sections in the headline report
 *
 * Note, sections are encapsulated with a container to manage max width,
 * a scroll trigger for the animation as they enter the viewport,
 * then typically the grid structure for the specific section formatting.
 *
 */

export const SimpleTextSection = ({ headerText = null, textArray }) => {
  /**
   * lg width simple paragraphs
   */
  return (
    <Container maxWidth="lg">
      <ScrollTriggeredSection
        backupBackgroundColor="light"
        transitionDuration={0.5}
      >
        {/* Simple text, no formatting, PARAGRAPH SPACING */}
        <Grid container size={12} spacing={3}>
          {headerText && (
            <PrimaryParagraphHeader>{headerText}</PrimaryParagraphHeader>
          )}

          {textArray.map((paragraph, index) => (
            <Grid key={index} size={12}>
              <PrimaryParagraphText>{paragraph}</PrimaryParagraphText>
            </Grid>
          ))}
        </Grid>
      </ScrollTriggeredSection>
    </Container>
  );
};

export const WideTwoColumnSection = ({
  leftSection,
  rightSection,
  padding,
}) => {
  /**
   * Two grids side by side with xl max width.
   * Contents of each section centred.
   * Switching to top and bottom for md and below
   */
  return (
    <Container maxWidth="xl">
      <ScrollTriggeredSection
        backupBackgroundColor="light"
        transitionDuration={0.5}
      >
        <Grid container size={12} px={padding}>
          <HeadlineReportPaperFrame>
            <Grid
              container
              size={12}
              rowSpacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid
                size={{ xs: 12, lg: 6 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid container>
                  <Grid sx={{ textAlign: "center" }}>{leftSection}</Grid>
                </Grid>
              </Grid>

              <Grid
                size={{ xs: 12, lg: 6 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid container>
                  <Grid sx={{ textAlign: "center" }}>{rightSection}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </HeadlineReportPaperFrame>
        </Grid>
      </ScrollTriggeredSection>
    </Container>
  );
};

export const CentredBoxSection = ({ children, padding }) => {
  /**
   * Centred box, with padding from edges
   * Note, the width is driven by the natural width of the content, with maximum width
   * defined by the container max width and the grid padding.
   */
  return (
    <Container maxWidth="lg">
      <ScrollTriggeredSection
        backupBackgroundColor="light"
        transitionDuration={0.5}
      >
        <Grid
          container
          size={12}
          px={padding}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HeadlineReportPaperFrame>{children}</HeadlineReportPaperFrame>
        </Grid>
      </ScrollTriggeredSection>
    </Container>
  );
};

export const CentredSectionNoPaper = ({ children, padding }) => {
  /**
   * Centred box, with padding from edges.
   * No paper layout - used for components that already have their own container.
   * Note, the width is driven by the natural width of the content, with maximum width
   * defined by the container max width and the grid padding.
   */
  return (
    <Container maxWidth="lg">
      <ScrollTriggeredSection
        backupBackgroundColor="light"
        transitionDuration={0.5}
      >
        <Grid
          container
          size={12}
          px={padding}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Grid>
      </ScrollTriggeredSection>
    </Container>
  );
};
