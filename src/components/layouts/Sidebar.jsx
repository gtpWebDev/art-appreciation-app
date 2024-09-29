import PropTypes from "prop-types";

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
    text: "Account Owners",
    linkLoc: "/reports/accountAAIReport",
    icon: <OwnerIcon />,
  },
  {
    text: "Nfts",
    linkLoc: "/reports/nftTransactionReport",
    icon: <NftIcon />,
  },
  {
    text: "Score Rankings",
    linkLoc: "/reports/rankedAAIReport",
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

const Sidebar = ({ handleDrawerClose_cbfn, open }) => {
  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose_cbfn}>
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
    </Drawer>
  );
};

Sidebar.propTypes = {
  handleDrawerClose_cbfn: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Sidebar;
