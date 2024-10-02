import { createContext, useContext, useEffect, useState } from "react";

import { axiosGet } from "../../../../lib/axiosUtility";

import { TRANSACTION_TYPES } from "../../../../constants/dataConstants";

import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

// styled components
import {
  StyledTableHeaderCell,
  StyledTableCell,
} from "../../../styledComponents/table";

import { formatTransaction } from "../../../../utils/dataTidy";

// Define context for some table variables
const TableContext = createContext({
  transactions: [],
  isSmallScreen: null,
  isExtraSmallScreen: null,
  smallScreenCellSettings: {},
});

/**
 * TransactionDisplay component - displays a list of transactions for a chosen Nft
 * @param {Object} nftData - array of nft transactions
 */
const TransactionDisplay = ({ nftData }) => {
  const [transactions, setTransactions] = useState(null);

  // collect transactions for the nft
  useEffect(() => {
    const getTransactions = async () => {
      const response = await axiosGet(`/transactions/nfts/${nftData.id}`);
      if (response.success) {
        setTransactions(response.data);
      } else {
        console.log("Nft iterations not available");
      }
    };
    nftData ? getTransactions() : setTransactions(null);
  }, [nftData]);

  return (
    transactions && (
      <Grid
        container
        direction="column"
        spacing={1}
        size={12}
        sx={{
          alignItems: "center",
        }}
      >
        {/* <TransactionDisplayHeader /> */}
        <TransactionTable transactions={transactions} />
      </Grid>
    )
  );
};

const TransactionDisplayHeader = () => {
  return (
    <Grid size={12}>
      <Typography component="h4" variant="h4" p={3} color="black">
        Transactions
      </Typography>
    </Grid>
  );
};

const TransactionTable = ({ transactions }) => {
  // define context

  // Screens below medium identified, and drive different table content
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const isExtraSmallScreen = useMediaQuery((theme) =>
    theme.breakpoints.down("sm")
  );

  // hidden overflow with ellipsis for small screens
  const smallScreenCellSettings = {
    maxWidth: isExtraSmallScreen ? 120 : "auto", // Set max width based on screen size
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <TableContext.Provider
      value={{
        transactions,
        isSmallScreen,
        isExtraSmallScreen,
        smallScreenCellSettings,
      }}
    >
      <Grid align="center">
        <TableContainer component={Paper}>
          <Table stickyHeader size="small">
            <TransactionTableHeader />
            <TransactionTableBody />
          </Table>
        </TableContainer>
      </Grid>
    </TableContext.Provider>
  );
};

const TransactionTableHeader = () => {
  const { smallScreenCellSettings } = useContext(TableContext);

  return (
    <TableHead>
      <TableRow>
        <StyledTableHeaderCell
          sx={smallScreenCellSettings}
          headerText="Transaction Type"
        />
        <StyledTableHeaderCell
          sx={smallScreenCellSettings}
          headerText="Date / Time"
        />
        <StyledTableHeaderCell
          sx={{ display: { xs: "none", md: "table-cell" } }} // removed for xs,sm
          headerText="Price (Tezos)"
        />
        <StyledTableHeaderCell headerText="Price ($)" />
        <StyledTableHeaderCell
          sx={smallScreenCellSettings} // Ellipsis...
          headerText="Score"
        />
        <StyledTableHeaderCell
          sx={{ display: { xs: "none", md: "table-cell" } }} // removed for xs,sm
          headerText="Normalised Score"
        />
      </TableRow>
    </TableHead>
  );
};

const TransactionTableBody = () => {
  const { transactions } = useContext(TableContext);

  return (
    <TableBody>
      {transactions.map((trans) => (
        <TransactionTableRow key={trans.id} trans={trans} />
      ))}
    </TableBody>
  );
};

const TransactionTableRow = ({ trans }) => {
  const { isSmallScreen, smallScreenCellSettings } = useContext(TableContext);

  const isPurchase = (trans) =>
    trans.transaction_type === TRANSACTION_TYPES.PRIMARY_PURCHASE ||
    trans.transaction_type === TRANSACTION_TYPES.SECONDARY_PURCHASE;

  const tidyTrans = formatTransaction(trans);

  const dateTime = isSmallScreen
    ? tidyTrans.shortTransDateTime
    : tidyTrans.transDateTime;

  return (
    <>
      {/* Purchase cycle separator for new purchases*/}
      {isPurchase(trans) && (
        <TableRow>
          <TableCell colSpan={6} style={{ borderBottom: "3px solid grey" }} />
        </TableRow>
      )}
      {/* data row */}
      <TableRow key={trans.id}>
        <StyledTableCell
          sx={smallScreenCellSettings}
          text={tidyTrans.transType}
        />
        <StyledTableCell text={dateTime} />
        <StyledTableCell
          text={tidyTrans.priceTz}
          sx={{ display: { xs: "none", md: "table-cell" } }}
        />
        <StyledTableCell text={tidyTrans.priceUsd} />
        <StyledTableCell text={tidyTrans.score} sx={smallScreenCellSettings} />
        <StyledTableCell
          text={tidyTrans.normalisedScore}
          sx={{ display: { xs: "none", md: "table-cell" } }}
        />
      </TableRow>
    </>
  );
};

export default TransactionDisplay;
