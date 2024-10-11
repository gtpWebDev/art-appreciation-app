// Material UI components
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// Account context
import { AccountOwnerProvider, useAccountOwner } from "./AccountOwnerContext";

// Subcomponents
import ReportHeader from "../../../composites/ReportHeader";
import AccountOwnerFilter from "./AccountOwnerFilter";
import SummaryStatsSection from "./SummaryStatsSection";
import ScoresSection from "./AccountScoreSection";
import MonthlyPurchasesSection from "./MonthlyPurchasesSection";
import AccountTransactionsSection from "./AccountTransactionsSection";

import theme from "../../../../theme";

const AccountOwnerReport = () => {
  return (
    <AccountOwnerProvider>
      {/* Main container - full width */}
      <Grid container spacing={2} align="center">
        <Grid size={12} mb={3}>
          <ReportHeader headerText="Account Summary" />
        </Grid>
        <Grid size={12}>
          <AccountOwnerFilter />
        </Grid>
        <ReportSections />
      </Grid>
    </AccountOwnerProvider>
  );
};

const ReportSections = () => {
  const { accountOwner } = useAccountOwner();
  return (
    accountOwner && (
      <>
        <Grid size={12}>
          <StatsSection />
        </Grid>
        <Grid size={12}>
          <ScoresSection />
        </Grid>
        <Grid size={12}>
          <TransactionsSection />
        </Grid>
      </>
    )
  );
};

/** Formatting component for section
 *  At medium, split 50/50 screen
 *  At large and above, only right grid expands
 */
const StatsSection = () => {
  return (
    <Paper elevation={6}>
      <Grid container size={12} rowSpacing={{ xs: 1, md: 2 }} columnSpacing={0}>
        <Grid size={12}>
          <Typography variant="h4" pt={2}>
            Account Statistics
          </Typography>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6, lg: 5 }}
          sx={{
            width: "100%",
            [theme.breakpoints.up("lg")]: { width: "570px" },
            display: "flex",
            justifyContent: "center",
          }}
          align="center"
        >
          <SummaryStatsSection />
        </Grid>
        <Grid
          size={{ xs: 12, md: 6, lg: "grow" }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <MonthlyPurchasesSection />
        </Grid>
      </Grid>
    </Paper>
  );
};

/**
 * Formatting component for section
 */
const TransactionsSection = () => {
  return (
    <Paper elevation={6}>
      <Grid container size={12} rowSpacing={1}>
        <Grid size={12}>
          <Typography variant="h4" pt={2}>
            Transactions
          </Typography>
        </Grid>
        <Grid size={12} align="center" p={2}>
          <AccountTransactionsSection />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccountOwnerReport;
