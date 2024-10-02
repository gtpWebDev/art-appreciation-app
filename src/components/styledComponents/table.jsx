import TableCell from "@mui/material/TableCell";

import { styled } from "@mui/system";

export const StyledTableHeaderCell = ({ headerText, sx }) => {
  return <TableHeaderCellStyling sx={sx}>{headerText}</TableHeaderCellStyling>;
};

const TableHeaderCellStyling = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.contrastText,
  textAlign: "center",
}));

export const StyledTableCell = ({ text, sx }) => {
  return <TableCellStyling sx={sx}>{text}</TableCellStyling>;
};

const TableCellStyling = styled(TableCell)(({ theme }) => ({
  textAlign: "right",
  // fontSize: "0.875rem", // Default font size for smaller screens
  // [theme.breakpoints.up("sm")]: {
  //   fontSize: "1rem", // For small and larger screens
  // },
  // [theme.breakpoints.up("md")]: {
  //   fontSize: "1rem", // For medium and larger screens
  // },
  // [theme.breakpoints.up("lg")]: {
  //   fontSize: "1rem", // For large and larger screens
  // },
  // [theme.breakpoints.up("xl")]: {
  //   fontSize: "1.25rem", // For large and larger screens
  // },
}));
