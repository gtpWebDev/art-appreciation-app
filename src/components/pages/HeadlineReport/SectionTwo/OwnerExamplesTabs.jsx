import { useState } from "react";

// material UI
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";

// subcomponents
import TabStructure from "../../../composites/TabStructure";
import AccountOwnerFilter from "../../../composites/AccountOwnerFilter";
import { OwnerMonthlyPurchasesChart } from "../../reports/accountOwnerReport/MonthlyPurchasesSection";
import StatsTable from "../../reports/accountOwnerReport/StatsTable";
import LoadingCircle from "../../../composites/LoadingCircle";
import FxhashOwnerLink from "../../../primitives/FxhashOwnerLink";

import {
  PrimaryParagraphHeader,
  PrimaryParagraphText,
  SecondaryHighlightList,
} from "../../../primitives/headlineReportItems";

// hooks
import useGetBackendData from "../../../../hooks/useGetBackendData";

// utility
import {
  formatDollarCurrency,
  formatPercentage,
} from "../../../../utils/formatting";
import { shortenAddress } from "../../../../utils/textFunctions";

/**
 * Tab structure, with 4 tabs:
 * - top art appreciator
 * - top art speculator
 * - mixed appreciation / speculation
 * - user can input their own account id
 *
 * Uses mui generalised tab structure
 */

const OwnerExamplesTab = () => {
  const tabConfigArray = [
    {
      index: 0,
      label: "Top collector",
      content: <TabContent ownerId={5322} userProvidedId={false} />, // top buyer, GalaxyRGB
    },
    {
      index: 1,
      label: "Top speculator",
      content: <TabContent ownerId={658} userProvidedId={false} />, // top seller
    },
    {
      index: 2,
      label: "Mixed",
      content: <TabContent ownerId={17892} userProvidedId={false} />, // Will WTBS account
    },
    {
      index: 3,
      label: "Input an account",
      content: <TabContent ownerId={null} userProvidedId={true} />, // use input ownerId
    },
  ];

  return (
    <Container maxWidth="md">
      <TabStructure tabConfig={tabConfigArray} />
    </Container>
  );
};

/**
 * Tab content uses existing components to display information on a specific ownerId.
 * Receive ownerId through prop, or if not provided, through user input in filter
 * Note, ownerId here is the backend database index (e.g. 1), not the tz address.
 */

const TabContent = ({ ownerId, userProvidedId }) => {
  const MIN_HEIGHT = 920; // keeps a fixed height for all scenarios

  // manage accountOwner - from tab selection or user
  const [accountOwner, setAccountOwner] = useState(ownerId);
  const handleOwnerChange = (newValue) => setAccountOwner(newValue.id);

  return (
    <Paper elevation={6}>
      <Grid container spacing={2} align="center" minHeight={MIN_HEIGHT} p={2}>
        {/* For user input tab, add owner filter */}
        {userProvidedId && (
          <Grid size={12} mb={1}>
            <AccountOwnerFilter setAccountOwner={handleOwnerChange} />
          </Grid>
        )}
        {accountOwner && <OwnerContent accountOwner={accountOwner} />}
      </Grid>
    </Paper>
  );
};

const OwnerContent = ({ accountOwner }) => {
  /**
   * Rather than collecting the data for each element through 3 different endpoints,
   * content uses a single chapter 6 end point with an ownerId parameter
   */

  const ownerUrl = `/headline-report/chapter6/owners/${accountOwner}`;
  console.log("ownerUrl", ownerUrl);
  const { data, error, loading } = useGetBackendData(ownerUrl);

  if (loading) return <LoadingCircle />;

  return (
    <>
      <Grid size={12} mb={1}>
        <AccountSummarySection summaryData={data.ownerSummary} />
      </Grid>
      <Grid size={12} mb={1}>
        <ActivitySection activityData={data.ownerStats} />
      </Grid>
      <Grid size={12} mb={1}>
        <MonthlyPurchasesSection monthlyData={data.monthlyPurchasesSummary} />
      </Grid>
    </>
  );
};

const AccountSummarySection = ({ summaryData }) => {
  const percentageArtSpend =
    summaryData.art_dollars / summaryData.total_purchase_value_usd;

  const listItems = [
    <>
      Total spend:{" "}
      {formatDollarCurrency(summaryData.total_purchase_value_usd, 0)}
    </>,
    <>
      - Art Appreciation - {formatDollarCurrency(summaryData.art_dollars, 0)}{" "}
      spent on art to keep
    </>,
    <>
      - Art Speculation -{" "}
      {formatDollarCurrency(summaryData.speculate_dollars, 0)} spent on art to
      sell
    </>,
    <>
      - % of spend on Art Appreciation -{" "}
      {formatPercentage(percentageArtSpend, 1)}
    </>,
  ];

  return (
    <>
      <PrimaryParagraphHeader>Highlights</PrimaryParagraphHeader>
      <br />
      <PrimaryParagraphText>
        Account id:{" "}
        <FxhashOwnerLink address={summaryData.parent_address}>
          {shortenAddress(summaryData.parent_address)}
        </FxhashOwnerLink>
      </PrimaryParagraphText>
      <SecondaryHighlightList listItems={listItems} />
    </>
  );
};

const ActivitySection = ({ activityData }) => {
  return (
    <>
      <PrimaryParagraphHeader>Account Activity</PrimaryParagraphHeader>
      <br />
      <StatsTable tableData={activityData} />
    </>
  );
};

const MonthlyPurchasesSection = ({ monthlyData }) => {
  // collect account details from context

  return (
    <>
      <PrimaryParagraphHeader>Monthly Purchases</PrimaryParagraphHeader>
      <br />
      <OwnerMonthlyPurchasesChart data={monthlyData} height={250} />
    </>
  );
};

export default OwnerExamplesTab;
