import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

/**
 * General intro:
 * https://mui.com/material-ui/customization/theming/
 *
 * Color tool:
 * https://m2.material.io/inline-tools/color/
 * e.g. red[500]
 *
 * Additional tool for understanding impact of theme on mui components
 * https://zenoo.github.io/mui-theme-creator
 */

const secondaryMain = "#a03e4d";

// Create a theme instance.
let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#410818",
    },
    secondary: {
      main: "#a03e4d",
    },
    background: {
      default: "#f7f4f4",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(57,5,5,0.87)",
      secondary: "rgba(70,32,32,0.6)",
    },
    footer: {
      accent: secondaryMain,
      background: "#0E012B",
    },
  },

  components: {
    // MuiPaper: {
    //   styleOverrides: {
    //     root: {
    //       // backgroundColor: "transparent",
    //       backgroundColor: primaryMain,
    //     },
    //   },
    // },
    // MuiButton: {
    //   styleOverrides: {
    //     // seems to work with specificity
    //     root: {
    //       // all button types
    //       disableRipple: true, // bit old fashioned
    //       borderRadius: 10,
    //     },
    //     containedPrimary: {
    //       // only override for contained and primary instances of button
    //       borderRadius: 10,
    //     },
    //   },
    //   // add your own variants
    //   variants: [
    //     {
    //       props: {
    //         variant: "square-red",
    //       },
    //       style: {
    //         backgroundColor: red[500],
    //         color: "#ffffff",
    //         borderRadius: 1,
    //       },
    //     },
    //   ],
    // },
    // MuiFab: {
    //   defaultProps: {
    //     size: "medium",
    //   },
    //   styleOverrides: {
    //     // use a function to change how existing properties such as "size" work
    //     root: ({ state }) => ({
    //       ...(state.size === "large" && {
    //         width: 60,
    //         height: 60,
    //       }),
    //     }),
    //   },
    // },
    // Change stack default alignment to center
    // MuiStack: {
    //   defaultProps: {
    //     // direction: "column",
    //     alignItems: "center",
    //   },
    // },
  },
});

// Very nice trick, all Typography responds to window size
// all variants react to the viewport
theme = responsiveFontSizes(theme);

export default theme;
