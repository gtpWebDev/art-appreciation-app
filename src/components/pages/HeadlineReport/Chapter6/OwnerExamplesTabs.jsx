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

import {
  PrimaryParagraphText,
  SecondaryHighlightList,
} from "../../../primitives/headlineReportItems";

// hooks
import useGetBackendData from "../../../../hooks/useGetBackendData";

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
  const [accountOwner, setAccountOwner] = useState(ownerId);

  const handleOwnerChange = (newValue) => setAccountOwner(newValue.id);

  const MIN_HEIGHT = 600; // keeps a fixed height for all scenarios

  return (
    <Paper elevation={6}>
      <Grid container spacing={2} align="center" minHeight={MIN_HEIGHT} p={2}>
        {userProvidedId && (
          <Grid size={12} mb={1}>
            <AccountOwnerFilter setAccountOwner={handleOwnerChange} />
          </Grid>
        )}
        {accountOwner && (
          <>
            <Grid size={12} mb={1}>
              <AccountSummarySection />
            </Grid>
            <Grid size={12} mb={1}>
              <StatsSection accountOwner={accountOwner} />
            </Grid>
            <Grid size={12} mb={1}>
              <MonthlyPurchasesSection accountOwner={accountOwner} />
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
};

/**
 * Centred box, left aligned
 */
const AccountSummarySection = () => {
  const listItems = [
    <>Total spend: 736k</>,
    <>- Art Appreciation - $735k spent on art to keep</>,
    <>- Art Speculation - $1k spent on art to sell</>,
    <>- % of spend on Art Appreciation - 99.9%</>,
  ];

  return (
    <>
      <PrimaryParagraphText>Account id: tz1...zjxx</PrimaryParagraphText>
      <SecondaryHighlightList listItems={listItems} />
    </>
  );
};

const StatsSection = ({ accountOwner }) => {
  const summaryStatsUrl = `/fxstats/owners/${accountOwner}`;
  const { data, error, loading } = useGetBackendData(summaryStatsUrl);

  if (loading) return <LoadingCircle />;

  return <StatsTable tableData={data} />;
};

const MonthlyPurchasesSection = ({ accountOwner }) => {
  // collect account details from context

  // hook for collecting monthly purchase data
  const { data, error, loading } = useGetBackendData(
    `http://localhost:3000/purchases/by-month/owners/${accountOwner}`
  );

  if (loading) return <LoadingCircle />;

  return <OwnerMonthlyPurchasesChart data={data} height={250} />;
};

export default OwnerExamplesTab;
