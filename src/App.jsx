import { useState } from "react";

import { Outlet, Link } from "react-router-dom";

import NavBar from "./components/layouts/NavBar";
import Footer from "./components/layouts/Footer";
import Sidebar from "./components/layouts/Sidebar";

import ScrollToTop from "./scrollToTop";

/**
 * App structure is minimalistic. Function navbar at top, no titlebar.
 * Sidebar for links, always visible.
 * Main content through react-router.
 *
 * NavBar should be 100% window width, Main max width xl
 * Footer should stick to bottom (be pushed to end of page)
 */

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import { DrawerHeader } from "./components/styledComponents/div";
import { Main } from "./components/styledComponents/main";

/**
 * Need to adjust structure to ensure footer is sticking at bottom
 */

function App() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    // Ensures whole app stretches to full screen height
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <NavBar toggleDrawer={toggleDrawer} open={open} />
      <Sidebar toggleDrawer={toggleDrawer} open={open} />
      <Main open={open}>
        <DrawerHeader />
        {/* Pushes footer to bottom */}
        <Container
          maxWidth="xl"
          sx={{
            flexGrow: 1,
          }}
          // Padding outside the Outlet page content
          style={{ padding: "20px" }}
        >
          <Outlet />
        </Container>
        <Footer />
      </Main>
    </Box>
  );
}

export default App;
