import { useEffect, useState, createContext, useContext } from "react";

// Material UI components
import useMediaQuery from "@mui/material/useMediaQuery";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/Table";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";

// styled components
import {
  StyledTableHeaderCell,
  StyledTableCell,
  StyledTableCellLeftAlign,
} from "../../../styledComponents/table";

// utility
import {
  formatNumber,
  formatDollarCurrency,
  formatTezosCurrency,
  formatTransactionType,
} from "../../../../utils/formatting";

// Define context for some table variables
const StatsTableContext = createContext({
  ellipsisCellSettings: {},
});

const StatsTable = ({ tableData }) => {
  // Cater for changed content at dfferent break levels
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  // hidden overflow with ellipsis for small screens
  const ellipsisCellSettings = {
    maxWidth: isMdScreen ? 120 : "auto", // Set max width based on screen size
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const [tableArray, setTableArray] = useState([]);

  const transactionTypes = [
    "primary_purchase",
    "secondary_purchase",
    "listing",
    "delisting",
  ];

  const searchArray = (array, transType) => {
    return array.find((element) => element.transaction_type === transType);
  };

  // structure data to easily map it
  useEffect(() => {
    const createEmpty = (transType) => ({
      transaction_type: transType,
      transaction_count: 0,
      tz_sum: 0,
      usd_sum: 0,
    });

    const structuredArray = transactionTypes.map(
      (transType) => searchArray(tableData, transType) ?? createEmpty(transType)
    );

    setTableArray(structuredArray);
  }, [tableData]);

  return (
    <StatsTableContext.Provider value={{ ellipsisCellSettings }}>
      <TableContainer component={Paper}>
        <Table stickyHeader size="small">
          <StatsTableHeader />
          <StatsTableBody data={tableArray} />
        </Table>
      </TableContainer>
    </StatsTableContext.Provider>
  );
};

const StatsTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <StyledTableHeaderCell>{"Test text"}</StyledTableHeaderCell>
        <StyledTableHeaderCell>{"Count"}</StyledTableHeaderCell>
        <StyledTableHeaderCell>{"Tezos"}</StyledTableHeaderCell>
        <StyledTableHeaderCell>{"Usd"}</StyledTableHeaderCell>
      </TableRow>
    </TableHead>
  );
};

const StatsTableBody = ({ data }) => {
  return (
    <TableBody>
      {data.map((row) => (
        <StatsTableRow key={row.transaction_type} rowData={row} />
      ))}
    </TableBody>
  );
};

const StatsTableRow = ({ rowData }) => {
  const { ellipsisCellSettings } = useContext(StatsTableContext);

  const usdTotal =
    rowData.usd_sum === null ? "" : formatDollarCurrency(rowData.usd_sum, 0);

  const tzTotal =
    rowData.tz_sum === null ? "" : formatTezosCurrency(rowData.tz_sum, 0);

  return (
    <TableRow>
      <StyledTableCellLeftAlign
        sx={ellipsisCellSettings}
        text={formatTransactionType(rowData.transaction_type)}
      />
      <StyledTableCell text={formatNumber(rowData.transaction_count)} />
      <StyledTableCell text={tzTotal} />
      <StyledTableCell text={usdTotal} />
    </TableRow>
  );
};

export default StatsTable;
