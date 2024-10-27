import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

import { styled } from "@mui/system";

import theme from "../../theme";

/**
 * Note all links here deal with potential clash of Link used with
 * both material UI and react-router-dom
 */

export const CompositeLinkPrimaryUnderline = ({ children, linkLoc }) => {
  return (
    <StyledLinkUnderline
      component={RouterLink}
      to={linkLoc}
      color={theme.palette.primary.main}
    >
      {children}
    </StyledLinkUnderline>
  );
};

export const CompositeLinkPrimaryNoUnderline = ({ children, linkLoc }) => {
  return (
    <StyledLinkNoUnderline
      component={RouterLink}
      to={linkLoc}
      color={theme.palette.primary.main}
    >
      {children}
    </StyledLinkNoUnderline>
  );
};

export const CompositeLinkContrastUnderline = ({ children, linkLoc }) => {
  return (
    <StyledLinkUnderline
      component={RouterLink}
      to={linkLoc}
      color={theme.palette.primary.contrastText}
    >
      {children}
    </StyledLinkUnderline>
  );
};

export const CompositeLinkContrastNoUnderline = ({ children, linkLoc }) => {
  return (
    <StyledLinkNoUnderline
      component={RouterLink}
      to={linkLoc}
      color={theme.palette.primary.contrastText}
    >
      {children}
    </StyledLinkNoUnderline>
  );
};

// const StyledLink = styled(Link)(({ color }) => ({
//   color: color,
//   textDecoration: "none",
//   "&:hover": {
//     textDecoration: "underline",
//   },
// }));

const StyledLinkNoUnderline = styled(Link)(({ color }) => ({
  color: color,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "none",
  },
}));

const StyledLinkUnderline = styled(Link)(({ color }) => ({
  color: color,
  textDecoration: "underline",
}));

// export const CompositeLinkUnderline = ({ children, linkLoc }) => {
//   return (
//     <StyledLinkUnderline
//       component={RouterLink}
//       to={linkLoc}
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       {children}
//     </StyledLinkUnderline>
//   );
// };

// export const CompositeLinkNoUnderline = ({ children, linkLoc }) => {
//   return (
//     <StyledLinkNoUnderline component={RouterLink} to={linkLoc}>
//       {children}
//     </StyledLinkNoUnderline>
//   );
// };
