import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH } from "../../constants/uiConstants";

/**
 * Ensures main area takes up full width when sidebar closed,
 * but adjusts inwards when sidebar opens
 */

export const Main = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  // part of pushing footer to bottom of screen
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,

  // keep at zero so footer is at the bottom
  padding: theme.spacing(0),

  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  // margin 0, unless open true
  marginLeft: `0px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${DRAWER_WIDTH}px`,
      },
    },
  ],
}));
