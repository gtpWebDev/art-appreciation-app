// material UI
// NO TYPOGRAPHY IN HERE, MUST USE HEADLINEREPORTITEMS TO ENSURE CONSISTENCY
import Grid from "@mui/material/Grid2";

// subcomponents
import LoadingCircle from "../../../composites/LoadingCircle";
import NftDisplay from "../../../composites/NftDisplay";
import { CompositeLinkPrimaryUnderline } from "../../../styledComponents/links";
import {
  SimpleTextSection,
  CentredBoxSection,
  CentredSectionNoPaper,
} from "../SectionFormats";
import MonthlyPurchasesChart from "../../../composites/MonthlyPurchasesChart";

// constants
import { TRANSACTION_TYPES } from "../../../../constants/dataConstants";

import {
  PrimarySubheader,
  PrimarySubText,
  SecondaryHighlightList,
  PrimaryParagraphText,
  ChartHeader,
  ChartSubHeader,
} from "../../../primitives/headlineReportItems";

// utility
import {
  formatNumber,
  formatMillionNumber,
  formatMillionDollarCurrency,
} from "../../../../utils/formatting";

// hooks
import useHeadlineReportChapterData from "../useHeadlineReportChapterData";

// constants
import { ARTWORK_INFO } from "../../../../constants/imageConstants";

const Chapter4 = ({ chapterEndpoint }) => {
  // get chapter data from API, or from report context if already collected
  const { data, loading, error } =
    useHeadlineReportChapterData(chapterEndpoint);

  if (loading) return <LoadingCircle />;

  // SECTION SPACING, FURTHER PADDING AHEAD OF NEXT CHAPTER
  return (
    <Grid container rowSpacing={10}>
      <Grid size={12}>
        <Chapter4_Intro />
      </Grid>

      <Grid size={12}>
        <NftDisplay_GardenMonoliths156 />
      </Grid>

      <Grid size={12}>
        <Chapter4_Text1 />
      </Grid>

      <Grid size={12}>
        <Chapter4_FxhashStats data={data} />
      </Grid>

      <Grid size={12}>
        <Chapter4_Text2 />
      </Grid>

      <Grid size={12}>
        <MonthlySalesChart />
      </Grid>
    </Grid>
  );
};

const Chapter4_Intro = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      fx(hash) is a generative art platform located on the Tezos blockchain.
      After the success of Artblocks, the launch a full year later, in November
      2021 attracted a great deal of interest. Unlike Artblocks, where artists
      were only able to release work after a robust curation process, any artist
      could simply upload their work and release it immediately. This more open
      approach very quickly gave rise to a huge library of projects, and it
      became the home to thousands of generative art collections.
    </>,
    <>
      From the beginning, collections varied from work by complete beginners,
      many who eventually developed strong followings, to established digital
      artists releasing work from algorithms that had been developed over years
      if not decades. Some of the more notable releases include William Mapan's{" "}
      <CompositeLinkPrimaryUnderline
        linkLoc={"https://www.fxhash.xyz/generative/slug/dragons"}
      >
        Dragons
      </CompositeLinkPrimaryUnderline>
      , Iskra Velitchkova's{" "}
      <CompositeLinkPrimaryUnderline
        linkLoc={"https://www.fxhash.xyz/generative/slug/uninhabitable-1"}
      >
        Uninhabitable
      </CompositeLinkPrimaryUnderline>{" "}
      and Zancan's{" "}
      <CompositeLinkPrimaryUnderline
        linkLoc={"https://www.fxhash.xyz/generative/slug/garden-monoliths"}
      >
        Garden, Monoliths
      </CompositeLinkPrimaryUnderline>
      .
    </>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

const NftDisplay_GardenMonoliths156 = () => {
  return (
    <CentredSectionNoPaper padding={{ xs: 1, sm: 2, md: 5, lg: 10 }}>
      <NftDisplay
        nftId={ARTWORK_INFO["garden_monoliths_156"].nftId}
        imageWidth={500}
        containerWidth={500}
      >
        <Grid pt={1} px={4}>
          <PrimarySubText>
            Garden, Monoliths was a landmark release on the fx(hash) platform,
            generating the largest sales of any artist collection. In July 22
            this rare pink edition was sold for 75,000tz ($114,000).
          </PrimarySubText>
        </Grid>
      </NftDisplay>
    </CentredSectionNoPaper>
  );
};

const Chapter4_Text1 = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      Whilst it may not have hit the dizzying heights and astonishing amounts of
      money drawn to Artblocks, the more open, "indie" feel, and adoption by the
      already flourishing Tezos community established a significant and vibrant
      market...
    </>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

const Chapter4_FxhashStats = ({ data }) => {
  // extract purchase summary numbers
  const secPurchases = data.purchasesSummary.find(
    (element) =>
      element.transaction_type === TRANSACTION_TYPES["SECONDARY_PURCHASE"]
  );
  const priPurchases = data.purchasesSummary.find(
    (element) =>
      element.transaction_type === TRANSACTION_TYPES["PRIMARY_PURCHASE"]
  );

  const fact1 = `${formatNumber(
    data.fxstats.artist_count
  )} artists have produced ${formatNumber(
    data.fxstats.collection_count
  )} art collections`;

  const fact2 = `${formatNumber(
    data.fxstats.owner_count
  )} collectors have purchased ${formatMillionNumber(
    data.fxstats.nft_count,
    1
  )} artworks`;

  const fact3 = `${formatMillionNumber(
    data.fxstats.listing_count,
    1
  )} relistings on the secondary market led to
             ${formatNumber(
               data.fxstats.secondary_purchase_count
             )} further sales`;

  const fact4 = `${formatMillionDollarCurrency(
    Number(priPurchases.usd_total) + Number(secPurchases.usd_total),
    1
  )} in total has been spent on art - ${formatMillionDollarCurrency(
    Number(priPurchases.usd_total),
    1
  )} directly to artists and ${formatMillionDollarCurrency(
    Number(secPurchases.usd_total),
    1
  )} on the secondary market`;

  const facts = [fact1, fact2, fact3, fact4];

  return (
    <CentredBoxSection padding={{ xs: 1, sm: 2, md: 5, lg: 10 }}>
      <Grid container justifyContent="center" alignItems="flex-start">
        <Grid size={12} pb={4}>
          <PrimarySubheader>fx(hash) in numbers...</PrimarySubheader>
        </Grid>
        <SecondaryHighlightList listItems={facts} />
        <Grid size={12}>
          <PrimaryParagraphText>
            Together, this represents the second largest generative art platform
            in the NFT world by revenue, and the largest by number of artworks.
          </PrimaryParagraphText>
        </Grid>
      </Grid>
    </CentredBoxSection>
  );
};

const Chapter4_Text2 = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      However, given the nature of the platform, it was almost inevitable that
      fx(hash) would be subject to the cycle of the wider web3 ecosystem. The
      late-2021 launch had just missed the peak of the NFT phenomenon. And while
      the market was resilient enough to remain strong for a full calendar year,
      the wider market forces were irresistible. The rise of a
      cryptocurrency-bear market, collapses of high-profile crypto projects and
      lending platforms, exascerbated by the rise of competing platforms keen to
      join the generative art bandwagon took their toll. Demand faded, popular
      artists were drawn away to temporarily brighter lights, and the market
      eventually subsided. The boom-bust cycle was unfortunately complete...
    </>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

const MonthlySalesChart = () => {
  return (
    <CentredBoxSection padding={{ xs: 1, sm: 2, md: 5, lg: 10 }}>
      <Grid container justifyContent="center" alignItems="flex-start">
        <Grid size={12}>
          <ChartHeader>The fx(hash) "boom-bust" cycle</ChartHeader>
          <ChartSubHeader>
            Primary (to artist) and secondary (market) sales, by calendar month
          </ChartSubHeader>
        </Grid>
        <Grid size={12}>
          <MonthlyPurchasesChart height={300} />
        </Grid>
      </Grid>
    </CentredBoxSection>
  );
};

export default Chapter4;
