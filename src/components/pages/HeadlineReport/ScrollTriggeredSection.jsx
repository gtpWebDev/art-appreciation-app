// animation library that enables scroll riggered animations
import { motion } from "framer-motion";

// material UI
import Grid from "@mui/material/Grid2";

// Structure for each section, with scroll-triggered animation and capability for a background image
// Located in headlineReport folder as only used for headlineReport

const ScrollTriggeredSection = ({ children, backgroundImage }) => {
  // const onEnter = () => {
  //   console.log(`Image ${backgroundImage} entered viewport`);
  // };

  // const onLeave = () => {
  //   console.log(`Image ${backgroundImage} left viewport`);
  // };

  return (
    // Motion animation settings for section content
    <motion.div
      initial={{ opacity: 0 }} // Initial hidden state
      whileInView={{ opacity: 1 }} // When considered in view (defined below), make visible
      exit={{ opacity: 0 }} // Fade out effect
      transition={{ duration: 0.5 }} // fade in
      viewport={{ once: false, amount: 0.3 }} // Trigger animation each time the section enters the viewport
      // onViewportEnter={onEnter} // Call function on enter
      // onViewportLeave={onLeave} // Call function on leave
    >
      {/* Background image, with capability for blur and opacity not impacting on content */}
      <Grid
        container
        p={{ xs: 1, sm: 5, md: 10, lg: 15 }}
        sx={{
          width: "100%",
          // height: "92vh",
          minHeight: "700px",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
            opacity: 0.6,
            zIndex: -1,
          },

          // slide show effect
          // scrollSnapAlign: "start",
        }}
      >
        <Grid
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {children}
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default ScrollTriggeredSection;
