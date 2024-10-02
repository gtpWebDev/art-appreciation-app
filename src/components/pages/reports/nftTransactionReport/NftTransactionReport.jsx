import { useState, createContext, useContext } from "react";
import { axiosGet } from "../../../../lib/axiosUtility";

// Constants
import {
  SEARCH_METHOD_ARTIST,
  SEARCH_METHOD_COLLECTION,
  SEARCH_METHOD_NFT,
} from "../../../../constants/uiConstants";

// Material UI components
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Styled components
import { ReversePaper } from "../../../styledComponents/paper";

// Subcomponents
import NftFilters from "./NftFilters";
import TransactionDisplay from "./TransactionDisplay";
import NftDisplay from "./NftDisplay";

// Custom hooks
import useFilterLogic from "../../../../hooks/useFilterLogic";

export const LEFT_COLUMN_WIDTH = 300;

// ***START OF FILTER CONTEXT SET-UP***

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

// Shorthand custom hook for using the filter context
export const useFilterContext = () => {
  return useContext(FilterContext);
};

// ***END OF FILTER CONTEXT SET-UP***

const NftTransactionReport = () => {
  return (
    <FilterProvider>
      {/* Main container - full width */}
      <Grid container spacing={2} align="center">
        {/* Header - full width*/}
        <Grid size={12} mb={3}>
          <ReportHeader />
        </Grid>

        {/* Left column is the filters and the nft display - no size, natural width */}
        <Grid>
          <Stack spacing={3}>
            <NftFilters />
            <NftDisplay />
          </Stack>
        </Grid>
        {/* Transaction display move to new line for xs and sm */}
        <Grid xs={12} md="true" align="center">
          <TransactionDisplay />
        </Grid>
      </Grid>
    </FilterProvider>
  );
};

const ReportHeader = () => {
  return (
    <ReversePaper elevation={6} sx={{ alignItems: "center" }}>
      <Typography
        component="h3"
        variant="h3"
        color="primary.contrastText"
        sx={{ padding: "20px 0" }}
        align="center"
      >
        Individual Nft Report
      </Typography>
      {/* Remove when design complete */}
      <Grid
        size={12}
        color="black"
        backgroundColor={{
          xs: "red",
          sm: "orange",
          md: "yellow",
          lg: "green",
          xl: "purple",
        }}
        mb={3}
      >
        xs red, sm orange, md yellow, lg green, xl purple
      </Grid>
    </ReversePaper>
  );
};

export default NftTransactionReport;
