import { useLayoutEffect, useEffect, useState, Suspense, lazy } from "react";

import { useInView } from "react-intersection-observer";

// Material UI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

// subcomponents
import ScrollTriggeredSection from "./ScrollTriggeredSection";
import WidthMonitor from "../../composites/WidthMonitor";

import StoryPage from "./StoryPage";

// hooks
// import useInView from "./useInView";

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

const initialChapterConfigs = [
  {
    id: 1,
    title: "Generative Art - Substance or Scam?",
    backendEndpoint: "/fxstats",
    contentComponent: Chapter1,
    headerBackgroundImage: ARTWORK_INFO["dragons_54_dark"].url,
    load: true,
  },
  {
    id: 2,
    title: "The NFT Market",
    backendEndpoint: null,
    contentComponent: Chapter2,
    headerBackgroundImage: ARTWORK_INFO["horizontes_61_dark"].url,
    load: true,
  },
  {
    id: 3,
    title: "Generative Art",
    backendEndpoint: null,
    contentComponent: Chapter3,
    headerBackgroundImage: ARTWORK_INFO["horizontes_187_dark"].url,
    load: true,
  },
  {
    id: 4,
    title: "fx(hash) on Tezos",
    backendEndpoint: "/fxstats",
    contentComponent: Chapter4,
    headerBackgroundImage: ARTWORK_INFO["horizontes_203_dark"].url,
    load: true,
  },
  {
    id: 5,
    title: "So was this real?",
    backendEndpoint: null,
    contentComponent: Chapter5,
    headerBackgroundImage: ARTWORK_INFO["slumbers_134_light"].url,
    load: true,
  },
  {
    id: 6,
    title: "How do you measure the love of art?",
    backendEndpoint: null,
    contentComponent: Chapter6,
    headerBackgroundImage: ARTWORK_INFO["adrift_10_dark"].url,
    load: true,
  },
  {
    id: 7,
    title: "Top level results",
    backendEndpoint: null,
    contentComponent: Chapter7,
    headerBackgroundImage: ARTWORK_INFO["coronado_190_dark"].url,
    load: true,
  },
  {
    id: 8,
    title: "Art or speculation?",
    backendEndpoint: null,
    contentComponent: Chapter8,
    headerBackgroundImage: ARTWORK_INFO["turner_light_162"].url,
    load: true,
  },
];

// initialise viewport status array to false for all chapters
const initialViewportStatus = initialChapterConfigs.map((chapter) => ({
  id: chapter.id,
  inViewport: false,
}));

const HeadlineReport = () => {
  // this gate keeps any updates to the chapterLoadArray - other chapters will not be
  // loaded until chapter has had its initial load
  // until it
  const [chapter1FirstLoad, setChapter1FirstLoad] = useState(false);

  const [chapterViewportStatus, setChapterViewportStatus] = useState(
    initialViewportStatus
  );

  const [chapterConfigs, setChapterConfigs] = useState(initialChapterConfigs);
  // logic to ensure chapters surrounding those on viewport are loaded
  // e.g.
  const updateLoadArray_cbfn = (chapterId, viewportStatus) => {
    console.log(
      `Updating chapter ${chapterId} based on viewport status ${viewportStatus}`
    );

    // immutable approach to ensure react recognises changes to arrays - map creates new array

    // generate new array with updated viewport status for each chapter
    const newViewportArray = chapterViewportStatus.map((chapter) =>
      chapter.id === chapterId
        ? { ...chapter, inViewport: viewportStatus }
        : chapter
    );

    // console.log("newViewportArray", newViewportArray);

    // generate array with required load status of each chapter based on their viewport status:
    // basically load the chapters n the viewport and those surrounding them
    // e.g. [3,4 in viewport - load 2,3,4,5 or 1 in viewport - load 1,2]
    const generateLoadArray = (newViewportArray) => {
      return newViewportArray.map((item, index) => {
        const inViewport =
          item.inViewport ||
          newViewportArray[index - 1]?.inViewport || // Optional chaining for prevItem
          newViewportArray[index + 1]?.inViewport ||
          false; // Optional chaining for nextItem

        return { ...item, load: inViewport };
      });
    };

    // SCREWING UP FINAL CHAPTER "load" as undefined
    const newLoadArray = generateLoadArray(newViewportArray);

    // console.log("newLoadArray", newLoadArray);

    // update the config array to reflect the required load status of each chapter
    const newConfigArray = chapterConfigs.map((chapter) => {
      const correspondingItem = newLoadArray.find((a) => a.id === chapter.id);
      return correspondingItem
        ? { ...chapter, load: correspondingItem.load }
        : chapter;
    });

    // console.log("newConfigArray", newConfigArray);

    // update state variables
    setChapterViewportStatus(newViewportArray);
    setChapterConfigs(newConfigArray);
  };

  useLayoutEffect(() => {
    console.log("Chapter 1 has rendered for the first time, ");
    setChapter1FirstLoad(true);
  }, []);

  return (
    <HeadlineReportCacheProvider>
      {/* Chapter in a vertical column */}
      <Grid container direction="column" rowSpacing={2}>
        {/* <ChapterFramework chapter={chapter1Config} /> */}
        {chapter1FirstLoad &&
          chapterConfigs.map((chapter) => (
            <Grid xs={12} key={chapter.id}>
              <ChapterLoadControl
                chapter={chapter}
                updateLoadArray_cbfn={updateLoadArray_cbfn}
              />
            </Grid>
          ))}
      </Grid>
    </HeadlineReportCacheProvider>
  );
};

/**
 * Initial control for loading of chapters:
 * - if chapter.load is true, opens up chapter for loading,
 * - if chapter.load is false, renders a minimum height box
 */
const ChapterLoadControl = ({ chapter, updateLoadArray_cbfn }) => {
  return (
    <Box
      sx={{
        minHeight: "auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {chapter.load ? (
        <Box>
          <ChapterViewportControl
            chapter={chapter}
            updateLoadArray_cbfn={updateLoadArray_cbfn}
          />
        </Box>
      ) : (
        <Box height={1000}>{chapter.id}</Box>
      )}
    </Box>
  );
};

/**
 * Ongoing viewport driven control of loading of chapters.
 * Through the callback function applied to the chapter config, this maintains
 * chapters loaded as those on the viewport, plus the chapters immediately before
 * and after those on the viewport.
 * e.g. 3 and 4 on the viewport - load 2,3,4,5
 */

const ChapterViewportControl = ({ chapter, updateLoadArray_cbfn }) => {
  // const handleViewportChange = (inView, entry) => {
  //   if (inView) {
  //     console.log(`Chapter ${chapter.id} is in view`);
  //   } else {
  //     console.log(`Chapter ${chapter.id} is out of view`);
  //   }
  //   updateLoadArray_cbfn(chapter.id, inView);
  // };

  // const { ref, inView } = useInView({
  //   triggerOnce: false,
  //   threshold: 0,
  //   // rootMargin: "-20% 0px -20% 0px",
  //   onChange: handleViewportChange,
  //   delay: 1000, // 1 second delay
  // });

  return (
    <Grid ref={ref} size={12}>
      {/* {inView && ( */}
      <Grid ref={ref} size={12}>
        <chapter.contentComponent chapterEndpoint={chapter.backendEndpoint} />
      </Grid>
      {/* )} */}
    </Grid>
  );
};

/**
 * Presentation framework for each chapter - extracts header, leaving content for chapter module
 */
const ChapterPresentation = ({ chapter }) => {
  // get chapter data from API, or from report context if already collected

  return (
    <Grid container rowSpacing={2}>
      <Grid size={12}>
        <ScrollTriggeredSection
          backgroundImage={chapter.headerBackgroundImage}
          minHeight="100px"
          backgroundBlur="0"
          backgroundOpacity={1}
        >
          <Chapter_Header title={chapter.title} />
        </ScrollTriggeredSection>
      </Grid>

      {/* Temporary width measure */}
      <WidthMonitor />
      {/* Reference to component containing content in separate module */}
      <Container maxWidth="lg">
        <chapter.contentComponent chapterEndpoint={chapter.backendEndpoint} />
      </Container>
    </Grid>
  );
};

const Chapter_Header = ({ title }) => {
  return (
    <Grid container>
      <Grid size={12}>
        <Typography variant="h2" pt={2} color="white" sx={{ fontWeight: 900 }}>
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HeadlineReport;
