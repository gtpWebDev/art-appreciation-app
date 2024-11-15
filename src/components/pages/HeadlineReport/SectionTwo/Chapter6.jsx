// material UI
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";

// subcomponents
import { SimpleTextSection, CentredBoxSection } from "../SectionFormats";
import { NextSectionLink } from "../NextSectionLink";
import { CompositeLinkPrimaryUnderline } from "../../../styledComponents/links";
import {
  PrimarySubheader,
  SecondaryHighlightList,
  PrimaryParagraphText,
} from "../../../primitives/headlineReportItems";
import OwnerExamplesTab from "./OwnerExamplesTabs";

// hooks
import useHeadlineReportChapterData from "../useHeadlineReportChapterData";

const Chapter6 = ({ chapterEndpoint }) => {
  // get chapter data from API, or from report context if already collected
  const { data, loading, error } =
    useHeadlineReportChapterData(chapterEndpoint);

  return (
    <Grid container rowSpacing={10}>
      <Grid size={12}>
        <Chapter6_Intro />
      </Grid>
      <Grid size={12}>
        <ArtAppreciationMeasuresList />
      </Grid>
      <Grid size={12}>
        <Chapter6_Text1 />
      </Grid>
      <Grid size={12}>
        <OwnerExamplesTab />
      </Grid>
      <Grid size={12}>
        <Chapter6_WrapUpText />
      </Grid>
      <Grid size={12}>
        <Chapter6_NextSectionLink />
      </Grid>
    </Grid>
  );
};

const Chapter6_Intro = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      The challenge was to look at a large, complex ecosystem, and to begin to
      understand what drove people to buy the artworks. Were they buying them
      because they appreciated them, and wanted to keep and enjoy them? Or was
      it because they believed they could sell them for profit?
    </>,
    <>
      For those interested in the approach taken in more detail, this can be
      found{" "}
      <CompositeLinkPrimaryUnderline linkLoc={"/methodPage"}>
        here
      </CompositeLinkPrimaryUnderline>
      , but the fundamentals were kept quite simple.
    </>,
    <>
      "Art appreciation" involved buying artworks, and simply keeping them for a
      period of time, without trying to sell them on the open market.
    </>,
    <>
      "Art speculation" involved buying artworks, and actively listing them for
      sale on the open market. (Whether the item sold or not was ignored as
      intent is what mattered here.)
    </>,
    <>
      Where a collector might lie on the continuum from "passionate and miserly
      art collector" to "frenzied profiteer" was built up from the millions of
      transactions to be found publically on the blockchain, and compounded into
      three fairly intuitive numbers:
    </>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

const ArtAppreciationMeasuresList = () => {
  const measuresList = [
    <>
      How many dollars were spent on art appreciation - art to keep and enjoy?
    </>,
    <>
      How many dollars were spent on art speculation - art to sell for profit?
    </>,
    <>What % of overall spend was spent on art appreciation?</>,
  ];

  return (
    <CentredBoxSection padding={{ xs: 1, sm: 2, md: 5, lg: 10 }}>
      <Grid container justifyContent="center" alignItems="flex-start">
        <Grid size={12}>
          <PrimarySubheader>
            "I'm more than just a number, I'm at least three..."
          </PrimarySubheader>
        </Grid>
        <Grid size={12} pl={4} pb={3}>
          <PrimaryParagraphText>
            - the three measures of art spending behaviour...
          </PrimaryParagraphText>
        </Grid>

        <SecondaryHighlightList listItems={measuresList} />
      </Grid>
    </CentredBoxSection>
  );
};

const Chapter6_Text1 = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      Money spent on artworks bought and kept by the collector contributed to
      the dollars spent on art appreciation. Money spent on artworks actively
      listed contributed to the dollars spent on art speculation. Behaviour
      anywhere between this would contribute to both.
    </>,
    <>
      This can feel a bit abstract, but it should become clear with some quite
      clear-cut examples...
    </>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

const Chapter6_WrapUpText = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      Hopefully by now you're comfortable with what the measures represent. It's
      time to start looking at the results.
    </>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

const Chapter6_NextSectionLink = () => {
  return (
    <NextSectionLink
      location="/headline/sectionThree"
      title="Top line results"
    />
  );
};

export default Chapter6;
