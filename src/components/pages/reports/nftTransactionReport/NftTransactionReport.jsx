import { createContext, useContext } from "react";

// Material UI components
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

// Subcomponents
import ReportHeader from "../../../composites/ReportHeader";
import NftFilters from "./NftFilters";
import TransactionDisplay from "./TransactionDisplay";
import NftDisplay from "./NftDisplay";

// Custom hooks
import useFilterLogic from "../../../../hooks/useFilterLogic";

export const LEFT_COLUMN_WIDTH = 300;

const FilterContext = createContext();

// Shorthand filter provider component
const FilterProvider = ({ children }) => {
  const filterValues = useFilterLogic(); // Get values and handlers from the custom hook
  return (
    <FilterContext.Provider value={filterValues}>
      {children}
    </FilterContext.Provider>
  );
};

// Shorthand custom hook for using the filter context (not really necessary)
export const useFilterContext = () => {
  return useContext(FilterContext);
};

/**
 * Formatting component:
 * medium and above - left column with filters and display,
 *    right column table taking remainder of width
 * xs and sm - left column above table, all centred
 */

const NftTransactionReport = () => {
  return (
    <FilterProvider>
      {/* Main container - full width */}
      <Grid container spacing={2} align="center">
        {/* Header - full width*/}
        <Grid size={12} mb={1}>
          <ReportHeader headerText="Individual Nft Report" />
        </Grid>

        {/* Left column is the filters and the nft display - centred small, otherwise natural width */}
        <Grid
          container
          size={{ xs: 12, md: "auto" }}
          justifyContent={{ xs: "center", md: "left" }}
        >
          <Stack spacing={3}>
            <NftFilters />
            <NftDisplay />
          </Stack>
        </Grid>
        {/* Transaction display move to new line for xs and sm */}
        <Grid size={{ xs: 12, md: "grow" }} align="center">
          <Paper elevation={6}>
            <TransactionDisplay />
          </Paper>
        </Grid>
      </Grid>
    </FilterProvider>
  );
};

export default NftTransactionReport;
