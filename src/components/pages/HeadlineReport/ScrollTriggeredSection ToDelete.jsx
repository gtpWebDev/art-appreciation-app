// animation library that enables scroll riggered animations
import { motion } from "framer-motion";

import theme from "../../../theme";

// material UI
import Grid from "@mui/material/Grid2";

/** Structure for sections of the headline report:
 *  - Scroll triggered animation using framer-motion makes the page visible when
 *    it is scrolled into the viewport, with props to adjust how this is applied.
 *  - Option to add a background image to the page. If no background image is provided, uses
 *    a themed background color, defaulting to light, can change to dark.
 *  Props:
 *  - visThreshold - the % of the contents required in the viewport to trigger the animation
 *  - transitionDuration - time for full animation in seconds
 *  - backgroundBlur - blur only applied to background
 *  - backgroundOpacity - opacity only applied to backgorund
 */

const ScrollTriggeredSection = ({
  children,
  backgroundImage,
  visThreshold = 0.3,
  transitionDuration = 1.5, // in seconds
  backgroundBlur = "2px",
  backgroundOpacity = 0.6,
  backupBackgroundColor = "dark",
  minHeight = "0px",
}) => {
  // used only if no image provided, defaults to dark
  const backgroundColor =
    backupBackgroundColor === "dark"
      ? theme.palette.headlineReport.darkBackground
      : theme.palette.headlineReport.lightBackground;

  return (
    // Motion animation settings for section content
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Fade out effect
      transition={{ duration: transitionDuration }}
      viewport={{ once: false, amount: visThreshold }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          minHeight: minHeight,
          position: "relative",
          overflow: "hidden",
          backgroundColor: backgroundImage ? "transparent" : backgroundColor, // Default color if no image

          "&::before": backgroundImage
            ? {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: `blur(${backgroundBlur})`,
                opacity: backgroundOpacity,
                zIndex: -1,
              }
            : null,
        }}
      >
        {children}
      </Grid>
    </motion.div>
  );
};

/**
 * The header is different enough to justify its own component.
 * Structure for sections of the headline report:
 *  - Scroll triggered animation using framer-motion makes the page visible when
 *    it is scrolled into the viewport, with props to adjust how this is applied.
 *  - Option to add a background image to the page. If no background image is provided, uses
 *    a themed background color, defaulting to light, can change to dark.
 *  Props:
 *  - visThreshold - the % of the contents required in the viewport to trigger the animation
 *  - transitionDuration - time for full animation in seconds
 *  - backgroundBlur - blur only applied to background
 *  - backgroundOpacity - opacity only applied to backgorund
 */
const ScrollTriggeredHeader = ({
  children,
  backgroundImage,
  visThreshold = 0.3,
  transitionDuration = 1.5, // in seconds
  backgroundBlur = "2px",
  backgroundOpacity = 0.6,
  backupBackgroundColor = "dark",
  minHeight = "0px",
}) => {
  // used only if no image provided, defaults to dark
  const backgroundColor =
    backupBackgroundColor === "dark"
      ? theme.palette.headlineReport.darkBackground
      : theme.palette.headlineReport.lightBackground;

  return (
    // Motion animation settings for section content
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Fade out effect
      transition={{ duration: transitionDuration }}
      viewport={{ once: false, amount: visThreshold }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          minHeight: minHeight,
          position: "relative",
          overflow: "hidden",
          backgroundColor: backgroundImage ? "transparent" : backgroundColor, // Default color if no image

          "&::before": backgroundImage
            ? {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: `blur(${backgroundBlur})`,
                opacity: backgroundOpacity,
                zIndex: -1,
              }
            : null,
        }}
      >
        {children}
      </Grid>
    </motion.div>
  );
};

// export default ScrollTriggeredSection;
