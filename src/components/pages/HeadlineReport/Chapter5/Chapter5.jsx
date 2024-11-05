// material UI
// NO TYPOGRAPHY IN HERE, MUST USE HEADLINEREPORTITEMS TO ENSURE CONSISTENCY
import Grid from "@mui/material/Grid2";

// hooks
import useHeadlineReportChapterData from "../useHeadlineReportChapterData";

// subcomponents
import NftDisplay from "../../../composites/NftDisplay";
import {
  SimpleTextSection,
  CentredSectionNoPaper,
  WideTwoColumnSection,
} from "../SectionFormats";
import { CompositeLinkPrimaryUnderline } from "../../../styledComponents/links";

import {
  SecondaryHighlightList,
  PrimarySubText,
} from "../../../primitives/headlineReportItems";

// constants
import { ARTWORK_INFO } from "../../../../constants/imageConstants";

/**
 * Chapters are added to and removed from the DOM based on whether they are close
 * to the viewport.
 * They therefore use a custom hook to either collect data from the API, or from the
 * report context if it has already been collected when it was previously on the
 * viewport.
 */

const Chapter5 = ({ chapterEndpoint }) => {
  // get chapter data from API, or from report context if already collected
  // const { data, loading, error } =
  //   useHeadlineReportChapterData(chapterEndpoint);

  return (
    <Grid container rowSpacing={10}>
      <Grid size={12}>
        <Chapter5_Intro />
      </Grid>
      <Grid size={12}>
        <Chapter5_ExampleFlippedArt />
      </Grid>

      <Grid size={12}>
        <Chapter5_Text1 />
      </Grid>
    </Grid>
  );
};

const Chapter5_Intro = () => {
  // Simple text paragraph structure
  const textArray = [
    <>So a fascinating few years...</>,
    <>
      Digital artists rewarded for their efforts and talent for the first time
      in history. Tens of thousands of passionate collectors clamouring for the
      latest releases by their favourite artists. Vibrant communities sharing
      and discussing their ever-growing personal collections. Finally, an art
      genre receiving the art appreciation that it had so long deserved!
    </>,
    <>But then... it didn't always feel quite right...</>,
    <>
      Hotly anticipated collections of hundreds of artworks snapped up in the
      blink of an eye, with countless collectors left disappointed... followed
      by so many listed on the secondary market within minutes...
    </>,
    <>
      Well-known collectors loudly anticipating a release for weeks, speaking of
      the depth and beauty of the artworks, only to sell them for profit?
    </>,
    <>
      Individual artworks passed through multiple buyers for ever-increasing
      prices, followed by a fire-sale months later...
    </>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

const Chapter5_ExampleFlippedArt = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      Acequia #323, by{" "}
      <CompositeLinkPrimaryUnderline
        linkLoc={"https://www.fxhash.xyz/u/Rich%20Poole"}
      >
        Rich Poole
      </CompositeLinkPrimaryUnderline>{" "}
      and{" "}
      <CompositeLinkPrimaryUnderline
        linkLoc={"https://www.fxhash.xyz/u/ThePaperCrane"}
      >
        ThePaperCrane
      </CompositeLinkPrimaryUnderline>
    </>,
  ];

  const saleList = [
    <>Bought from the artist for 64tz / $87 on 7th November, 2022</>,
    <>Sold later that day for 190tz / $205</>,
    <>Sold the next day for 333 tz / $368 </>,
    <>Sold only hours later for 977tz / $1,030</>,
    <>Sold a week later for $1,197tz / $1,185</>,
    <>A pause, but sold over 2 months later for 1,500tz / $1,731</>,
    <>Finally, almost a year later, sold for a cut-price 650tz / $696</>,
  ];

  const leftSection = (
    <>
      <SimpleTextSection
        headerText="One artwork, many owners..."
        textArray={textArray}
      />
      <br />
      <SecondaryHighlightList listItems={saleList} />
    </>
  );

  const rightSection = <NftDisplay_Acequia323 />;

  return (
    <WideTwoColumnSection
      leftSection={leftSection}
      rightSection={rightSection}
    />
  );
};

const NftDisplay_Acequia323 = () => {
  return (
    <CentredSectionNoPaper padding={{ xs: 1, sm: 2, md: 5, lg: 10 }}>
      <NftDisplay
        nftId={ARTWORK_INFO["acequia_323"].nftId}
        imageWidth={500}
        containerWidth={500}
      />
    </CentredSectionNoPaper>
  );
};

const Chapter5_Text1 = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      The forums would suggest that generative art had so much more substance
      than their poor cousins in the "monkey-pic" world of PFP collectibles,
      with their armies of flippers hunting "10x" returns; their copyminters
      convincing countless poor souls that their fake releases were genuine; the
      elaborate scams with corrupt links leading to accounts drained of their
      currency and assets; the bots buying up everything before any "real"
      people could buy even a single item...
    </>,
    <>And yet, this was all quite familiar.</>,

    <>
      Was this all just another money market, a casino by another name, swamped
      by traders driven only by the pursuit of money?
    </>,
    <>Or was it different this time? Let's take a look...</>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

export default Chapter5;
