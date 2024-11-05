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

const Chapter2 = ({ chapterEndpoint }) => {
  // get chapter data from API, or from report context if already collected
  const { data, loading, error } =
    useHeadlineReportChapterData(chapterEndpoint);

  return (
    <Grid container rowSpacing={10}>
      <Grid size={12}>
        <Chapter2_Intro />
      </Grid>
    </Grid>
  );
};

const Chapter2_Intro = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      NFT market many billions, even $1bn per day at peak. Main focus was
      collectibles / PFPs. Here are some examples - Bored Yacht, Crypto Puinks,
      etc.
    </>,
    <>
      Here is a chart showing the market size over time. And how it has faded
      away.
    </>,
    <>But then also generative art came along... More art focussed, etc.</>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

export default Chapter2;
