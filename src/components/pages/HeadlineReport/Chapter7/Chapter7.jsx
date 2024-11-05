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

const Chapter7 = ({ chapterEndpoint }) => {
  // get chapter data from API, or from report context if already collected
  const { data, loading, error } =
    useHeadlineReportChapterData(chapterEndpoint);

  return (
    <Grid container rowSpacing={10}>
      <Grid size={12}>
        <Chapter7_Intro />
      </Grid>
    </Grid>
  );
};

const Chapter7_Intro = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      here are the sales numbers for context. $50m over a few years, peaked at
      $m per month, down to nowt. Chart of primary and secondary sales over
      time. 44k accounts roughly. 8k accounts spent on only free. 25k owners
      behind these when look at how they move NFTs around. Look at the profile
      and some examples of owners with loads of accounts! Chart of top 100
      account owners to demonstrate some crazy flippers - support with top line
      numbers - e.g. top 500 owners had 5k accounts Chart of profile of spend of
      owners - max spend $700k. 8k only ever bought free items (find count).
      Average spend, etc. Probably chart of top 50 spenders. Possible chart of
      full profile of spend. Maybe use buckets, would need to deal with top
      spend swamping all others.
    </>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

export default Chapter7;
