// material UI
import Grid from "@mui/material/Grid2";

// subcomponents
import { SimpleTextSection } from "../SectionFormats";

// hooks
import useHeadlineReportChapterData from "../useHeadlineReportChapterData";

const Chapter3 = ({ chapterEndpoint }) => {
  // get chapter data from API, or from report context if already collected
  const { data, loading, error } =
    useHeadlineReportChapterData(chapterEndpoint);

  return (
    <Grid container rowSpacing={10}>
      <Grid size={12}>
        <Chapter3_Intro />
      </Grid>
    </Grid>
  );
};

const Chapter3_Intro = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      Generative art was also a big deal, albeit not as big as PFPs. Few
      platforms - artblocks on ethereum, fxhash on Tezos, then expanded out to
      probably 10 platforms. Here are some nice artblocks outputs, the populat
      Taylor stuff. Here is a chart of the types of money over time - compare to
      PFPs. Talk a bit about the generative art community - loved art, etc. more
      substance than NFT market? Introduce fxhash which appeared a bit later in
      November 21. More of an indie gen art. Tezos tended to be more indie.
      Lower cost, but a lot of OGs and people who have gone bigger.
    </>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

export default Chapter3;
