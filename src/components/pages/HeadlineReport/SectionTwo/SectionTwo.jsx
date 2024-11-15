import { useLayoutEffect, useState } from "react";
// Material UI
import Grid from "@mui/material/Grid2";

// subcomponents
import Chapter5 from "./Chapter5";
import Chapter6 from "./Chapter6";
import ChapterPresentation from "../ChapterPresentation";

// context
import { HeadlineReportCacheProvider } from "../HeadlineReportCacheContext";

// constants
import { ARTWORK_INFO } from "../../../../constants/imageConstants";

/**
 * Sections have been simplified:
 *  - Lazy Loading:
 *    - useLayoutEffect and state management is used to ensure Chapter 1 is loaded first
 *    - otherwise no lazy loading applied
 *  - DOM management - none applied (originally added and removed dynamically)
 *  - Data Management:
 *    - given that the data for the report is not huge, to avoid the data collection
 *      being repeated each time a section is visited, all headline report data
 *      is managed using the HeadlineReportCache context
 *    - this acts as a cache to store all of the chapter data.
 *    - each chapter has a custom hook which collects the data, but only if it doesn't
 *      already exist in the HeadlineReportCache context.
 *  - visibility of each section within the chapters managed using framer-motion
 */

const chapterConfigs = [
  {
    id: 5,
    title: "But was this all real?",
    backendEndpoint: null, // no data used in this chapter
    contentComponent: Chapter5,
    headerBackgroundImage: ARTWORK_INFO["slumbers_134_light"].url,
  },
  {
    id: 6,
    title: "How do you measure the love of art?",
    backendEndpoint: null,
    contentComponent: Chapter6,
    headerBackgroundImage: ARTWORK_INFO["adrift_10_dark"].url,
  },
];

const HeadlineSectionTwo = () => {
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

export default HeadlineSectionTwo;
