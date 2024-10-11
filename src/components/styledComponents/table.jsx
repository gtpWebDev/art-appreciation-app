import TableCell from "@mui/material/TableCell";

import { styled } from "@mui/system";

export const StyledTableHeaderCell = ({ children, sx }) => {
  return <TableHeaderCellStyling sx={sx}>{children}</TableHeaderCellStyling>;
};

// export const StyledTableHeaderCell = ({ headerText, sx }) => {
//   return <TableHeaderCellStyling sx={sx}>{headerText}</TableHeaderCellStyling>;
// };

const TableHeaderCellStyling = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.contrastText,
  textAlign: "center",
}));

export const StyledTableCell = ({ text, sx }) => {
  return <TableCellStyling sx={sx}>{text}</TableCellStyling>;
};

const TableCellStyling = styled(TableCell)(({}) => ({
  textAlign: "right",
}));

export const StyledTableCellLeftAlign = ({ text, sx }) => {
  return <TableCellStylingLeftAlign sx={sx}>{text}</TableCellStylingLeftAlign>;
};

const TableCellStylingLeftAlign = styled(TableCell)(({}) => ({
  textAlign: "left",
}));
