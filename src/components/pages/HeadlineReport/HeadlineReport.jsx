import { Suspense, lazy } from "react";

import { motion } from "framer-motion";

// Material UI
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

// hooks
import useInView from "./useInView";

// context
import HeadlineReportCacheContext, {
  HeadlineReportCacheProvider,
} from "./HeadlineReportCacheContext";

/**
 * Headline report is a specific set-up, compared to the format of the resst of the
 * site:
 * - Lazy Loading - used to ensure top page loads as quickly as possible (although
 *   given conditional rendering below this may not be necessary)
 * - DOM Management - a useInView custom hook used to conditionally render and unload
 *   chapters when they get close to / leave the viewport for positive UX, and to
 *   manage potential graphical performance impact of many chapters with many charts.
 * - Data Management:
 *    - data is managed using the HeadlineReportCache context, which
 *      acts as a cache to store all of the chapter data.
 *    - each chapter has a custom hook which collects the data, but only if it doesn't
 *      already exist in the HeadlineReportCache context.
 * - Section Visibility - individual sections / pages are made visible / invisible
 *   for a nice UX effect when c.30% on the viewport, using framer-motion
 */

// Subcomponents, utilising lazy loading
import Chapter1_Intro from "./Chapter1_Intro/Chapter1_Intro";
const Chapter2_Next = lazy(() =>
  import("./Chapter2_Next/Chapter2_Next").then((module) => {
    console.log("Chapter2 required - lazy loaded");
    return module;
  })
);
const Chapter3_Last = lazy(() =>
  import("./Chapter3_Last/Chapter3_Last").then((module) => {
    console.log("Chapter3 required - lazy loaded");
    return module;
  })
);

const HeadlineReport = () => {
  const [chapter1Ref, chap1IsInView] = useInView(0, "500px", "Chapter 1");
  const [chapter2Ref, chap2IsInView] = useInView(0, "500px", "Chapter 2");
  const [chapter3Ref, chap3IsInView] = useInView(0, "500px", "Chapter 3");

  return (
    <HeadlineReportCacheProvider>
      <Grid container align="center">
        <Grid ref={chapter1Ref} size={12} mb={1}>
          {chap1IsInView && (
            <Suspense fallback={<div>Loading...</div>}>
              <Chapter1_Intro
                name={"chapter 1"}
                chapterEndpoint={"/purchases/by-month"}
              />
            </Suspense>
          )}
        </Grid>
        <Grid ref={chapter2Ref} size={12} mb={1}>
          {chap2IsInView && (
            <Suspense fallback={<div>Loading...</div>}>
              <Chapter2_Next name={"chapter 2"} chapterEndpoint={"/fxstats"} />
            </Suspense>
          )}
        </Grid>
        <Grid ref={chapter3Ref} size={12} mb={1}>
          {chap3IsInView && (
            <Suspense fallback={<div>Loading...</div>}>
              <Chapter2_Next name={"chapter 3"} chapterEndpoint={"/fxstats"} />
            </Suspense>
          )}
        </Grid>
      </Grid>
    </HeadlineReportCacheProvider>
  );
};

export default HeadlineReport;
