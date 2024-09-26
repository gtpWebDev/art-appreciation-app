import { styled } from "@mui/material/styles";

/**
 * Styling from Persistent Drawer:
 * https://mui.com/material-ui/react-drawer/
 */

// Adds a buffer below the navbar and the container with the main content
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
