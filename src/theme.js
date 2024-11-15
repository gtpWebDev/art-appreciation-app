import { createTheme, responsiveFontSizes } from "@mui/material/styles";

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
const backgroundDefault = "rgb(242,242,242)"; //"#f8edee"; // "#f7f4f4";

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
      default: backgroundDefault,
      paper: "rgb(248,248,248)", // "#ffffff",
    },
    text: {
      primary: "rgba(57,5,5,0.87)",
      secondary: "rgba(70,32,32,0.6)",
    },
    footer: {
      accent: secondaryMain,
      background: "#0E012B",
    },
    headlineReport: {
      lightBackground: "#ffffff", // "#f0dbdd",
      darkBackground: "#912243",
    },
  },

  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: backgroundDefault,
        },
      },
    },
    MuiListSubHeader: {
      styleOverrides: {
        root: {
          backgroundColor: backgroundDefault,
        },
      },
    },
    /* This section required to reduce the height of the autocomplete and internal text field */
    // ***Start of autocomplete height adjustment***
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          height: "46px", // Set default height for the input root
          "& .MuiInputBase-input": {
            height: "100%", // Ensure the input fills the height of the root
            padding: "0 14px", // Adjust padding if needed
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: "translate(14px, 12px) scale(1)", // Adjust the transform for centering
          "&.Mui-focused": {
            transform: "translate(14px, -6px) scale(0.75)", // Position when focused
          },
          "&.MuiInputLabel-shrink": {
            transform: "translate(14px, -6px) scale(0.75)", // Position when shrunk (after input)
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          height: "46px", // Set default height for all TextFields
        },
      },
    },
    // ***End of autocomplete height adjustment***

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
