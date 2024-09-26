import Toolbar from "@mui/material/Toolbar";

import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { StyledNavBar } from "../styledComponents/navbar";

/**
 * Navbar fixed at top
 * - Icon to open drawer
 * - Currently then just some text
 */

const NavBar = ({ handleDrawerOpen_cbfn, open }) => {
  return (
    <StyledNavBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen_cbfn}
          edge="start"
          sx={[
            {
              mr: 2,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Menu
        </Typography>
      </Toolbar>
    </StyledNavBar>
  );
};

NavBar.propTypes = {
  handleDrawerOpen_cbfn: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default NavBar;
