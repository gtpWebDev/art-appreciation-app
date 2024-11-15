// material UI
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import theme from "../../theme";

// left border line, no rounded corners - preference
export const HeadlineReportPaperFrame = ({ children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderLeft: "6px solid #410818",
        borderBottom: "1px solid #410818",
        padding: 5,
        borderRadius: 0,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      {children}
    </Paper>
  );
};

// Frame for box containing mainly formatted text.
// Outer frame with left and bottom borders
// Inner frame subtle paper effect
export const TextBoxFrame = ({ children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "rgba(255,255,255,0.3)", // opaque background
        borderLeft: "6px solid #410818",
        // borderBottom: "2px solid #410818",
        padding: 2,
        borderRadius: 0,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 5,
          borderRadius: 0,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        {children}
      </Paper>
    </Paper>
  );
};

// original paper style
export const HeadlineReportPaperFrameStd = ({ children }) => {
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

// nicer elevated paper effect
export const HeadlineReportPaperFrame2 = ({ children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "rgb(252,252,252)",
        borderRadius: 3,
        boxShadow: "10px 10px 20px #b3b3b3, -10px -10px 20px #ffffff",
        padding: 3,
      }}
    >
      {children}
    </Paper>
  );
};

// left border, minimal shadow, nice
export const HeadlineReportPaperFrame3 = ({ children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #e0e0e0",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
        borderRadius: 4,
        padding: 5,
      }}
    >
      {" "}
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
