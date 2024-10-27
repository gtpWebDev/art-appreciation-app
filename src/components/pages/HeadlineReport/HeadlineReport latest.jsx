// material UI
import Grid from "@mui/material/Grid2";

import { Suspense, lazy } from "react";

// hooks
import useInView from "./useInView";

// Subcomponents
// import Section1_Intro from "./Section1_Intro/Section1_Intro";
const Section1_Intro = lazy(() => import("./Section1_Intro/Section1_Intro"));

const Section2_WiderMarket = lazy(() =>
  import("./Section2_WiderMarket/Section2_WiderMarket")
);

/**
 * Headline report has quite a unique set-up:
 *  - visually similar to a slide pack, showing a section at a time, only making a
 *    section visible when it enters the viewport, and reverting to invisible when
 *    scrolled off the top of the screen
 *  - a combination of lazy loading and context data provider components to spread out
 *    the API requests and to ensure that the data is collected ahead of it being required
 */

// Main component with content sections

const HeadlineReport = () => {
  // Create refs and visibility state for both sections
  const [ref1, isInView1] = useInView();
  const [ref2, isInView2] = useInView();

  return (
    <Grid container align="center">
      {/* <HeaderSection /> */}
      <div style={{ height: "150vh", backgroundColor: "#f0f0f0" }}>
        <p>Scroll down to load the lazy component...</p>
      </div>

      <Grid ref={ref1} size={12} mb={1}>
        {isInView1 && (
          <Suspense fallback={<div>NOT READY!</div>}>
            <Section1_Intro />
          </Suspense>
        )}
      </Grid>
      <div style={{ height: "150vh", backgroundColor: "#f0f0f0" }}>
        <p>Scroll down to load the lazy component...</p>
      </div>

      <Grid ref={ref2} size={12} mb={1}>
        {isInView2 && (
          <Suspense fallback={<div>NOT READY!</div>}>
            <Section2_WiderMarket />
          </Suspense>
        )}
      </Grid>
    </Grid>
  );
};

export default HeadlineReport;
