import { useLayoutEffect, useEffect, useState, Suspense, lazy } from "react";

import { useInView } from "react-intersection-observer";

// styles
import theme from "../../../theme";

// Material UI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

// subcomponents
import ScrollTriggeredSection from "../../composites/ScrollTriggeredSection";

import WidthMonitor from "../../composites/WidthMonitor";

// context
import { HeadlineReportCacheProvider } from "./HeadlineReportCacheContext";

// constants
import { ARTWORK_INFO } from "../../../constants/imageConstants";

/**
 * Headline report is a specific set-up, compared to the format of the rest of the
 * site:
 *  - Lazy loading - provisionally not necessary as the component modules themselves
 *    are unlikely to be large enough to cause a delay.
 *  - DOM Management - approach is to continuously control which chapters are loaded.
 *    - On page load, chapter 1 will fully render, and empty boxes with minimum heights
 *      will render for the other chapters.
 *      useLayoutEffect will be used to update the chapter1Loaded state variable when the
 *      initial render is complete.
 *      chapter1Loaded will gate keep the rendering of all the other chapters, and within
 *      this, useInView for each chapter will then be used to drive the chapter loading logic.
 *      The logic will simply be - if a chapter is in view, load the chapters either side.
 * - Data Management:
 *    - data is managed using the HeadlineReportCache context, which
 *      acts as a cache to store all of the chapter data.
 *    - each chapter has a custom hook which collects the data, but only if it doesn't
 *      already exist in the HeadlineReportCache context.
 * - Section Visibility - individual sections / pages are made visible / invisible
 *   for a nice UX effect when enough of the section / component is on the viewport,
 *   using framer-motion.
 *
 * DOM MANAGEMENT IS STILL VERY GLITCHY. REMOVING DOM ITEMS IN PARTICULAR SEEMS TO
 * TRIGGER THE CONTENT ON THE VIEWPORT TO "FLICK" AND IMPACT THE LOADING LOGIC
 * ERRATICALLY.
 * DISABLING THE DOM MANAGEMENT ELEMENT FOR NOW. IF IT CAUSES PERFORMANCE ISSUES
 * WILL NEED TO REVISIT.
 *
 */

// Subcomponents, utilising lazy loading - see above, may not be necessary
import Chapter1 from "./Chapter1/Chapter1";
import Chapter2 from "./Chapter2/Chapter2";
import Chapter3 from "./Chapter3/Chapter3";
import Chapter4 from "./Chapter4/Chapter4";
import Chapter5 from "./Chapter5/Chapter5";
import Chapter6 from "./Chapter6/Chapter6";
import Chapter7 from "./Chapter7/Chapter7";
import Chapter8 from "./Chapter8/Chapter8";

const chapterConfigs = [
  {
    id: 1,
    title: "Generative Art - Substance or Scam?",
    backendEndpoint: "/fxstats",
    contentComponent: Chapter1,
    headerBackgroundImage: ARTWORK_INFO["dragons_54_dark"].url,
  },
  // {
  //   id: 2,
  //   title: "The NFT Market",
  //   backendEndpoint: null,
  //   contentComponent: Chapter2,
  //   headerBackgroundImage: ARTWORK_INFO["horizontes_61_dark"].url,
  // },
  // {
  //   id: 3,
  //   title: "Generative Art",
  //   backendEndpoint: null,
  //   contentComponent: Chapter3,
  //   headerBackgroundImage: ARTWORK_INFO["horizontes_187_dark"].url,
  // },
  // {
  //   id: 4,
  //   title: "fx(hash) on Tezos",
  //   backendEndpoint: "/headline-report/chapter4",
  //   contentComponent: Chapter4,
  //   headerBackgroundImage: ARTWORK_INFO["horizontes_203_dark"].url,
  // },
  // {
  //   id: 5,
  //   title: "But was this all real?",
  //   backendEndpoint: null, // no data used in this chapter
  //   contentComponent: Chapter5,
  //   headerBackgroundImage: ARTWORK_INFO["slumbers_134_light"].url,
  // },
  {
    id: 6,
    title: "How do you measure the love of art?",
    backendEndpoint: null,
    contentComponent: Chapter6,
    headerBackgroundImage: ARTWORK_INFO["adrift_10_dark"].url,
  },
  {
    id: 7,
    title: "Top level results",
    backendEndpoint: null,
    contentComponent: Chapter7,
    headerBackgroundImage: ARTWORK_INFO["coronado_190_dark"].url,
  },
  {
    id: 8,
    title: "Art or speculation?",
    backendEndpoint: null,
    contentComponent: Chapter8,
    headerBackgroundImage: ARTWORK_INFO["turner_light_162"].url,
  },
];

const HeadlineReport = () => {
  // this gate keeps any updates to the chapterLoadArray - other chapters will not be
  // loaded until chapter has had its initial load
  // until it
  const [chapter1FirstLoad, setChapter1FirstLoad] = useState(false);

  useLayoutEffect(() => {
    console.log("Chapter 1 has rendered for the first time, ");
    setChapter1FirstLoad(true);
  }, []);

  return (
    <HeadlineReportCacheProvider>
      {/* Chapter in a vertical column, CHAPTER SPACING */}
      <Grid container direction="column" rowSpacing={10}>
        {chapter1FirstLoad &&
          chapterConfigs.map((chapter) => (
            <Grid xs={12} key={chapter.id}>
              <ChapterPresentation chapter={chapter} />
            </Grid>
          ))}
      </Grid>
    </HeadlineReportCacheProvider>
  );
};

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
  const minHeight = backgroundImage ? "300px" : "150px";
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

export default HeadlineReport;
