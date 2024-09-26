import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

/**
 * Custom paper with white box shadow, catering for elevation 3, 6, otherwise 8
 */

export const NormalPaper = styled(Paper)(({ theme, elevation }) => ({
  borderRadius: "2px",
  backgroundColor: theme.palette.paper,
  color: theme.palette.text.primary,
}));

// export const NormalPaper = styled(Box)(({ theme, elevation }) => ({
//   borderRadius: "2px",
//   backgroundColor: theme.palette.paper,
//   // color: theme.palette.text.primary,
//   boxShadow:
//     elevation === 3
//       ? "0px 1px 8px rgba(255, 255, 255, 0.2), 0px 3px 4px rgba(255, 255, 255, 0.14), 0px 3px 3px rgba(255, 255, 255, 0.12)"
//       : elevation === 6
//       ? "0px 3px 5px -1px rgba(255, 255, 255, 0.2), 0px 6px 10px rgba(255, 255, 255, 0.14), 0px 1px 18px rgba(255, 255, 255, 0.12)"
//       : "0px 5px 5px -3px rgba(255, 255, 255, 0.2), 0px 8px 10px 1px rgba(255, 255, 255, 0.14), 0px 3px 14px 2px rgba(255, 255, 255, 0.12)",
// }));

export const ReversePaper = styled(Paper)(({ theme, elevation }) => ({
  borderRadius: "2px",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));
