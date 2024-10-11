import PropTypes from "prop-types";

import { useState, useEffect, createContext, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// hooks
import useGetStickyTableData from "../../hooks/useGetPaginatedTableData";

// styled components
import { StyledTableHeaderCell } from "../styledComponents/table";

// subcomponents
import LoadingCircle from "./LoadingCircle";

/**
 * Paginated table, using much of the examples in the mui documentation -
 * https://mui.com/material-ui/react-table/
 * Generalised to collect data from any backend endpoint, with parameters for
 * column names and formatting(?)
 */

// context
const PaginatedTableContext = createContext({
  data: [],
  count: 0,
  page: 0,
  rowsPerPage: 0,
  handleChangePage: () => {},
  handleChangeRowsPerPage: () => {},
  columns: [],
});

export const PaginatedTable = (props) => {
  const { rootEndPoint, countEndPoint, columns } = props;

  // page and rows per page controls
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [updateTrigger, setUpdateTrigger] = useState(Date.now());

  const dataEndPoint = `${rootEndPoint}?page=${page}&rowsPerPage=${rowsPerPage}`;

  const { count, data, error, loading } = useGetStickyTableData(
    dataEndPoint,
    countEndPoint,
    updateTrigger
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setUpdateTrigger(Date.now());
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setUpdateTrigger(Date.now());
  };

  if (loading) return <LoadingCircle />;

  return (
    <PaginatedTableContext.Provider
      value={{
        data,
        count,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        columns,
      }}
    >
      <StickyTable />
    </PaginatedTableContext.Provider>
  );
};

PaginatedTable.propTypes = {
  rootEndPoint: PropTypes.string.isRequired,
  countEndPoint: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
};

const StickyTable = () => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeader />
          <TableContent />
        </Table>
      </TableContainer>
      <TablePaginationControl />
    </Paper>
  );
};

const TableHeader = () => {
  const { columns } = useContext(PaginatedTableContext);

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <StyledTableHeaderCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.title}
          </StyledTableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const TableContent = () => {
  const { data, columns } = useContext(PaginatedTableContext);

  return (
    <TableBody>
      {data.map((row) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align}>
                  {column.format ? column.format(value) : value}
                  {/* {column.format && typeof value === "number"
                    ? column.format(value)
                    : value} */}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

const TablePaginationControl = () => {
  const {
    count,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useContext(PaginatedTableContext);

  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default PaginatedTable;
