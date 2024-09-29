import { Link as RouterLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";

import { styled } from "@mui/system";

/**
 * Note all links here deal with potential clash of Link used with
 * both material UI and react-router-dom
 */

export const LinkedSidebarListItem = ({ children, linkLoc }) => {
  return (
    <StyledListItem component={RouterLink} to={linkLoc}>
      {children}
    </StyledListItem>
  );
};

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
