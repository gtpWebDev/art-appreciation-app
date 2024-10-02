import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

import { styled } from "@mui/system";

/**
 * Note all links here deal with potential clash of Link used with
 * both material UI and react-router-dom
 */

export const CompositeLink = ({ children, linkLoc }) => {
  return (
    <StyledLink component={RouterLink} to={linkLoc}>
      {children}
    </StyledLink>
  );
};

export const CompositeLinkUnderline = ({ children, linkLoc }) => {
  return (
    <StyledLinkUnderline
      component={RouterLink}
      to={linkLoc}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </StyledLinkUnderline>
  );
};

export const CompositeLinkNoUnderline = ({ children, linkLoc }) => {
  return (
    <StyledLinkNoUnderline component={RouterLink} to={linkLoc}>
      {children}
    </StyledLinkNoUnderline>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const StyledLinkNoUnderline = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "none",
  },
}));

const StyledLinkUnderline = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textDecoration: "underline",
}));
