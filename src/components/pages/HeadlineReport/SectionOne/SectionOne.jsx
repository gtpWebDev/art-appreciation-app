import { useLayoutEffect, useState } from "react";

// Material UI
import Grid from "@mui/material/Grid2";

// subcomponents
import Chapter1 from "./Chapter1";
import Chapter2 from "./Chapter2";
import Chapter3 from "./Chapter3";
import Chapter4 from "./Chapter4";
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
    id: 1,
    title: "Generative Art - Substance or Scam?",
    backendEndpoint: "/fxstats", // likely replace
    contentComponent: Chapter1,
    headerBackgroundImage: ARTWORK_INFO["dragons_54_dark"].url,
  },
  {
    id: 2,
    title: "The NFT Market",
    backendEndpoint: null,
    contentComponent: Chapter2,
    headerBackgroundImage: ARTWORK_INFO["horizontes_61_dark"].url,
  },
  {
    id: 3,
    title: "Generative Art",
    backendEndpoint: null,
    contentComponent: Chapter3,
    headerBackgroundImage: ARTWORK_INFO["horizontes_187_dark"].url,
  },
  {
    id: 4,
    title: "fx(hash) on Tezos",
    backendEndpoint: "/headline-report/chapter4",
    contentComponent: Chapter4,
    headerBackgroundImage: ARTWORK_INFO["horizontes_203_dark"].url,
  },
];

const HeadlineSectionOne = () => {
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
      {/* Chapter in a vertical column, includes chapter spacing here */}
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

export default HeadlineSectionOne;
