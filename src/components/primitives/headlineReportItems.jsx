// material UI
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import theme from "../../theme";

export const HeadlineReportPaperFrame = ({ children }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        backgroundColor: theme.palette.background.default, // "rgba(255, 255, 255)", // White
        padding: 5,
        margin: 1,
      }}
    >
      {children}
    </Paper>
  );
};

export const PrimarySubheader = ({ children }) => {
  return (
    <>
      <Typography
        variant="h4"
        component="h4"
        color="primary"
        sx={{ fontStyle: "italic", fontWeight: 900 }}
      >
        {children}
      </Typography>
    </>
  );
};

export const ChartHeader = ({ children }) => {
  return (
    <>
      <Typography variant="h4" component="h4" color="primary" align="center">
        {children}
      </Typography>
    </>
  );
};

export const ChartSubHeader = ({ children }) => {
  return (
    <>
      <Typography
        variant="body1"
        color="primary"
        align="center"
        sx={{ fontStyle: "italic" }}
      >
        {children}
      </Typography>
    </>
  );
};

export const PrimaryParagraphHeader = ({ children }) => {
  return (
    <>
      <Typography
        variant="h5"
        color="primary"
        align="left"
        sx={{ fontWeight: 900 }}
      >
        {children}
      </Typography>
    </>
  );
};

export const PrimaryParagraphText = ({ children }) => {
  return (
    <>
      <Typography variant="h6" component="p" color="primary" align="left">
        {children}
      </Typography>
    </>
  );
};

export const PrimarySubText = ({ children }) => {
  return (
    <>
      <Typography variant="body2" color="primary" sx={{ fontStyle: "italic" }}>
        {children}
      </Typography>
    </>
  );
};

export const SecondaryHighlightList = ({ listItems }) => {
  return (
    <>
      {listItems.map((item, index) => (
        <Grid key={index} size={12} pb={2} pl={4}>
          <SecondaryHighlightText>{item}</SecondaryHighlightText>
        </Grid>
      ))}
    </>
  );
};

export const SecondaryHighlightText = ({ children }) => {
  return (
    <>
      <Typography
        align="left"
        variant="h6"
        color="secondary"
        sx={{ fontStyle: "italic", lineHeight: 1.2 }}
      >
        {children}
      </Typography>
    </>
  );
};
