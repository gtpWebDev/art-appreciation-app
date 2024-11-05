// material UI
import Grid from "@mui/material/Grid2";

// subcomponents
import { SimpleTextSection } from "../SectionFormats";

// hooks
import useHeadlineReportChapterData from "../useHeadlineReportChapterData";

/**
 * Chapters are added to and removed from the DOM based on whether they are close
 * to the viewport.
 * They therefore use a custom hook to either collect data from the API, or from the
 * report context if it has already been collected when it was previously on the
 * viewport.
 */

const Chapter1 = ({ chapterEndpoint }) => {
  // get chapter data from API, or from report context if already collected
  const { data, loading, error } =
    useHeadlineReportChapterData(chapterEndpoint);

  return (
    <Grid container rowSpacing={10}>
      <Grid size={12}>
        <Chapter1_Intro />
      </Grid>
    </Grid>
  );
};

const Chapter1_Intro = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      Crypto was big. Lots of people spending money. From it emerged generative
      art. Lots of people said art good. Others bought and sold for profit. Now
      that it has settled down, want to look at whether the generative art
      phenomenon was real - was it passionate collectors buying an exciting new
      art genre, or was it just a bunch of greedy speculators jumping on the
      latest bandwagon?{" "}
    </>,
    <>This interactive report attempts to answer that question. Read on...!</>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

export default Chapter1;
