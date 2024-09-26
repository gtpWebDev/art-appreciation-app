# art-appreciation-app

This app was setup with the following github template:
**skeleton-react-single-page-app**

Refer to README.md of the template for details if necessary, but note that the tmeplate is farily frequently updated.

## Project Side Objectives

- Explore more flexible use of react-routing
- Full testing on front-end

## To add to the template

Additions for template, while developing this app.

### Add additional subdirectory structure

Note, incorporate this with the other subdirectory things already added - tests, services, etc.

```markdown
- src/
  - components/
    - pages/ - should correspond directly with a "page" within the single page app
    - layouts/ - elements that form part of the layout of every page - e.g. navbar
    - composites/ - repeated components with some depth to them
    - primitives/ - very basic, 1 dimensional, repeated component
    - styledComponents/ - designed components used with Material UI
  - lib/ - core logic
  - utils/ - small, reusable logic outside core logic
```

### Move existing pages to components/pages subdirectories

General clear out of src base directory of page components and hook

## Add material UI

### Installation and setup

Install Material UI and its dependencies.
(To use icons also install icons-material)

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

Material UI uses Roboto by default, so add it via fontsource, and import it

```bash
npm install @fontsource/roboto
```

**main.jsx**

```js
import "@fontsource/roboto";
```

### Add CssBaseline, theme provider and theme file

The theme provider allows a theme to be applied across any scope - e.g. the whole app.
CssBaseline adds styles for more consistency across browsers, consistent box sizing, base typography styles and removes default margins.

**main.jsx**

```js
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
```

Note, reduce theme file down to a helpful starter, this currently includes specific of dogami app.

**theme.js**

```js
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

/**
 * General intro:
 * https://mui.com/material-ui/customization/theming/
 *
 * Color tool:
 * https://m2.material.io/inline-tools/color/
 * e.g. red[500]
 */

// when generating theme can't reference theme!
const primaryMain = "#1E0356";
const secondaryMain = "#74175A";

// Create a theme instance.
let theme = createTheme({
  palette: {
    // Everything defaults to primary
    primary: {
      main: primaryMain,
      contrastText: "#ffffff",
      unfocused: "#999999",
      // light: // can set up light and dark mode
      // dark:
    },
    secondary: {
      main: secondaryMain,
    },
    // error, warning, info, success for severity and use in Alerts
    error: {
      main: red.A400,
    },
    footer: {
      accent: secondaryMain,
      background: "#0E012B",
    },
    customBackground: {
      // think no longer used
      main: "#330033",
    },
  },
  // Stack defaults - center
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // backgroundColor: "transparent",
          backgroundColor: primaryMain,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // seems to work with specificity
        root: {
          // all button types
          disableRipple: true, // bit old fashioned
          borderRadius: 10,
        },
        containedPrimary: {
          // only override for contained and primary instances of button
          borderRadius: 10,
        },
      },
      // add your own variants
      variants: [
        {
          props: {
            variant: "square-red",
          },
          style: {
            backgroundColor: red[500],
            color: "#ffffff",
            borderRadius: 1,
          },
        },
      ],
    },
    MuiFab: {
      defaultProps: {
        size: "medium",
      },
      styleOverrides: {
        // use a function to change how existing properties such as "size" work
        root: ({ state }) => ({
          ...(state.size === "large" && {
            width: 60,
            height: 60,
          }),
        }),
      },
    },
    MuiStack: {
      defaultProps: {
        // direction: "column",
        alignItems: "center",
      },
    },
  },
});

// Very nice trick, all Typography responds to window size
// all variants react to the viewport
theme = responsiveFontSizes(theme);

export default theme;
```

## Relocate layout components

Add **Footer.jsx**, **NavBar**, **SideBar** to components/layout directory, linking them in App.jsx
