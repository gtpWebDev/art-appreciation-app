import PropTypes from "prop-types";

import { createContext, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// hooks
import useGetBackendData from "../../hooks/useGetBackendData";

// styled components
import { StyledTableHeaderCell } from "../styledComponents/table";

// subcomponents
import LoadingCircle from "./LoadingCircle";

// constants
import { TRANSACTION_TYPES } from "../../constants/dataConstants";

/**
 * Paginated table, using much of the examples in the mui documentation -
 * https://mui.com/material-ui/react-table/
 * Generalised to collect data from any backend endpoint, with a columns array
 * to define the table content and styles
 */

// context
const UnpaginatedTableContext = createContext({
  data: [], // table data
  columnSpec: [], // array spec for column content and formatting
  tableMaxHeight: 0, // table max height px
});

export const UnpaginatedTable = (props) => {
  const { endPoint, columnSpec, tableMaxHeight } = props;

  const { data, error, loading } = useGetBackendData(endPoint);

  if (loading) return <LoadingCircle />;

  return (
    <UnpaginatedTableContext.Provider
      value={{
        data,
        columnSpec,
        tableMaxHeight,
      }}
    >
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: tableMaxHeight }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHeader />
            <TableContent />
          </Table>
        </TableContainer>
      </Paper>
    </UnpaginatedTableContext.Provider>
  );
};

UnpaginatedTable.propTypes = {
  endPoint: PropTypes.string.isRequired,
  columnSpec: PropTypes.array.isRequired,
};

// const StickyTable = () => {
//   const { tableMaxHeight } = useContext(UnpaginatedTableContext);

//   return (
//     <Paper sx={{ width: "100%", overflow: "hidden" }}>
//       <TableContainer sx={{ maxHeight: tableMaxHeight }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHeader />
//           <TableContent />
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// };

const TableHeader = () => {
  const { columnSpec } = useContext(UnpaginatedTableContext);

  return (
    <TableHead>
      <TableRow>
        {columnSpec.map((column) => (
          <StyledTableHeaderCell
            key={column.id}
            align={column.align}
            sx={{ minWidth: column.minWidth }}
          >
            {column.title}
          </StyledTableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const TableContent = () => {
  const { data } = useContext(UnpaginatedTableContext);

  return (
    <TableBody>
      {data.map(
        (
          row,
          index // index added to allow identification of top row
        ) => (
          <TableContentRow row={row} index={index} key={row.id} />
        )
      )}
    </TableBody>
  );
};

// Extracting row component allows for more control
const TableContentRow = ({ row, index }) => {
  const { columnSpec } = useContext(UnpaginatedTableContext);

  // identify purchases to add a "purchase cycle" separator ahead of new purchases
  const isPurchase = (trans) =>
    trans.transaction_type === TRANSACTION_TYPES.PRIMARY_PURCHASE ||
    trans.transaction_type === TRANSACTION_TYPES.SECONDARY_PURCHASE;

  // assist formatting - blank price for non-purchases
  const isBlank = (column) =>
    !isPurchase(row) && (column.id === "price_tz" || column.id === "price_usd");

  // shorthand to apply column formatting
  const applyFormat = (column, value) =>
    column.format ? column.format(value) : value;

  return (
    <>
      {/* Purchase cycle separator for new purchases*/}
      {isPurchase(row) && index > 0 && (
        <TableRow
          sx={{
            height: "0px",
            "& > *": {
              padding: "0px",
            },
          }}
        >
          <TableCell
            colSpan={columnSpec.length}
            sx={{
              borderBottom: (theme) =>
                `3px solid ${theme.palette.secondary.main}`,
            }}
          />
        </TableRow>
      )}
      <TableRow hover>
        {columnSpec.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {isBlank(column) ? "" : applyFormat(column, value)}
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
};

TableContentRow.propTypes = {
  row: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default UnpaginatedTable;
