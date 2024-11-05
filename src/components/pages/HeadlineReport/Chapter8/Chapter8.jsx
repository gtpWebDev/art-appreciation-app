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

const Chapter8 = ({ chapterEndpoint }) => {
  // get chapter data from API, or from report context if already collected
  const { data, loading, error } =
    useHeadlineReportChapterData(chapterEndpoint);

  return (
    <Grid container rowSpacing={10}>
      <Grid size={12}>
        <Chapter8_Intro />
      </Grid>
    </Grid>
  );
};

const Chapter8_Intro = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      Top line $38m on art, $12m on speculation - roughly 75% art Insert pie
      chart Overall profile of owners - 8k only ever bought free stuff.
      Collectors dominated from the remaining accounts. 20k kept everything, 3k
      kept almost all, 4k kept good majority
    </>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

export default Chapter8;
