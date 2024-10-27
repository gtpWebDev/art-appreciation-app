import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

//Icons
import OwnerIcon from "@mui/icons-material/Person";
import NftIcon from "@mui/icons-material/ColorLens";
import ScoreRankIcon from "@mui/icons-material/MilitaryTech";
import HeadlineReportIcon from "@mui/icons-material/Assignment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MethodIcon from "@mui/icons-material/Calculate";
import AboutIcon from "@mui/icons-material/HelpOutline";

import Typography from "@mui/material/Typography";

import { LinkedSidebarListItem } from "../styledComponents/listItem";

import { DRAWER_WIDTH } from "../../constants/uiConstants";

import { DrawerHeader } from "../styledComponents/div";

import theme from "../../theme";

const drilldownListItems = [
  {
    text: "Account Owner",
    linkLoc: "/reports/accountOwnerReport",
    icon: <OwnerIcon />,
  },
  {
    text: "Nft",
    linkLoc: "/reports/nftTransactionReport",
    icon: <NftIcon />,
  },
  {
    text: "Scores",
    linkLoc: "/reports/scoreReport",
    icon: <ScoreRankIcon />,
  },
];

const behindTheScenesItems = [
  {
    text: "Methodology",
    linkLoc: "/methodPage",
    icon: <MethodIcon />,
  },
  {
    text: "About the site",
    linkLoc: "/techPage",
    icon: <AboutIcon />,
  },
];

const Sidebar = ({ toggleDrawer, open }) => {
  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Headline Report"].map((text, index) => (
            <LinkedSidebarListItem key={index} disablePadding linkLoc={"/"}>
              <ListItemButton>
                <ListItemIcon>
                  <HeadlineReportIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </LinkedSidebarListItem>
          ))}
        </List>
        <Divider />
        <List
          subheader={
            <ListSubheader sx={{ backgroundColor: "background.default" }}>
              <Typography pt={2} variant="subtitle1" color="secondary">
                Drilldowns
              </Typography>
            </ListSubheader>
          }
        >
          {drilldownListItems.map((itemDetails, index) => (
            <LinkedSidebarListItem
              key={index}
              disablePadding
              linkLoc={itemDetails.linkLoc}
            >
              <ListItemButton>
                <ListItemIcon>{itemDetails.icon}</ListItemIcon>
                <ListItemText primary={itemDetails.text} />
              </ListItemButton>
            </LinkedSidebarListItem>
          ))}
        </List>
        <Divider />
        <List
          subheader={
            <ListSubheader sx={{ backgroundColor: "background.default" }}>
              <Typography pt={2} variant="subtitle1" color="secondary">
                Behind the scenes...
              </Typography>
            </ListSubheader>
          }
        >
          {behindTheScenesItems.map((itemDetails, index) => (
            <LinkedSidebarListItem
              key={index}
              disablePadding
              linkLoc={itemDetails.linkLoc}
            >
              <ListItemButton>
                <ListItemIcon>{itemDetails.icon}</ListItemIcon>
                <ListItemText primary={itemDetails.text} />
              </ListItemButton>
            </LinkedSidebarListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

Sidebar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Sidebar;
