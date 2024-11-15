// material UI
import Grid from "@mui/material/Grid2";

// subcomponents
import { SimpleTextSection } from "../SectionFormats";
import {
  ChartHeader,
  ChartSubHeader,
} from "../../../primitives/headlineReportItems";

import LoadingCircle from "../../../composites/LoadingCircle";
import NftDisplay from "../../../composites/NftDisplay";
import { CompositeLinkPrimaryUnderline } from "../../../styledComponents/links";
import { CentredSectionNoPaper, WideTwoColumnSection } from "../SectionFormats";
import { NextSectionLink } from "../NextSectionLink";
import MonthlyPurchasesChart from "../../../composites/MonthlyPurchasesChart";

// hooks
import useHeadlineReportChapterData from "../useHeadlineReportChapterData";

const Chapter7 = ({ chapterEndpoint = null }) => {
  // get chapter data from API, or from report context if already collected
  // const { data, loading, error } =
  //   useHeadlineReportChapterData(chapterEndpoint);

  return (
    <Grid container rowSpacing={10}>
      <Grid size={12}>
        <Chapter7_Intro />
      </Grid>
      <Grid size={12}>
        <Chapter7_FxHashMarketSummary />
      </Grid>
      <Grid size={12}>
        <Chapter7_FxHashMarketText />
      </Grid>
    </Grid>
  );
};

const Chapter7_Intro = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      REVIEW WHETHER THIS STRUCTURE MAKES SENSE. MULTIPLE ACCOUNTS BETTER IN
      SECTION 1 FXHASH CHAPTER?{" "}
    </>,
    <>
      Let's recap the size and shape of the fx(hash) market to provide some
      context.
    </>,
    <>
      $50m over a few years, peaked at $8m per month, and a period of over a
      year consistently over $2m per month - more than $60k per day. But of
      course this has reduced down to very small volumes, and the question
      remains whether the volumes and interest will ever return.
    </>,
    <>
      Around 44k accounts have participated in the market since November 2021.
      But an interesting question is how many people (or in fact organisations
      or buying groups) were behind these accounts. It's well known that many
      people owned multiple accounts - some separating their buying from their
      safe ledger account; others enabling parallel buying through multiple
      accounts. This may seem like a minor question, but given how regularly
      this happened, and the potential for dedicated separate buying and selling
      accounts skewing the results, an attempt has been made to group accounts
      under single owners and consider them together.
    </>,
    <>
      It's by no means a trivial question how many people lay behind these
      accounts. There will always be some uncertainty in identifying linked
      accounts under a single owner. BUT WE DID IT, INSERT DETAILS HERE OR
      ELSEWHERE.
    </>,
    <>
      DEPENDING ON RESULTS ON ACCOUNTS PER OWNER, CHANGE FORMAT, MIGHT GIVE IT
      MORE OF IT'S OWN SPACE, ETC.
    </>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

const Chapter7_FxHashMarketSummary = () => {
  const leftSection = <MonthlySalesChart />;
  const rightSection = <Chapter7_AccountsPerOwner />;

  return (
    <WideTwoColumnSection
      leftSection={leftSection}
      rightSection={rightSection}
    />
  );
};

const MonthlySalesChart = () => {
  return (
    <Grid container justifyContent="center" alignItems="flex-start">
      <Grid size={12}>
        <ChartHeader>Full life-cycle sales</ChartHeader>
      </Grid>
      <Grid size={12}>
        <MonthlyPurchasesChart height={300} />
      </Grid>
    </Grid>
  );
};

const Chapter7_AccountsPerOwner = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      This is a placeholder for a chart showing number of accounts per owner.
      Analysis not done yet. Might be number of owners with X accounts, Y
      accounts, etc. Might be top 100 owners in terms of number of accounts.
    </>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

const Chapter7_FxHashMarketText = () => {
  // Simple text paragraph structure
  const textArray = [
    <>
      44k accounts roughly. 8k accounts spent on only free. 25k owners behind
      these when look at how they move NFTs around. Look at the profile and some
      examples of owners with loads of accounts! Chart of top 100 account owners
      to demonstrate some crazy flippers - support with top line numbers - e.g.
      top 500 owners had 5k accounts Chart of profile of spend of owners - max
      spend $700k. 8k only ever bought free items (find count). Average spend,
      etc. Probably chart of top 50 spenders. Possible chart of full profile of
      spend. Maybe use buckets, would need to deal with top spend swamping all
      others.
    </>,
  ];

  return <SimpleTextSection textArray={textArray} />;
};

export default Chapter7;
