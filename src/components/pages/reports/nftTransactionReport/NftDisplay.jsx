// Material UI components
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Styled components
import { CompositeLinkPrimaryUnderline } from "../../../styledComponents/links";

// subcomponents
import NftImageDisplay from "../../../composites/NftImageDisplay";

// Utility
import {
  ipfsLink,
  fxArtistLink,
  fxCollectionLink,
} from "../../../../utils/fxhashAddresses";

import { LEFT_COLUMN_WIDTH } from "./NftTransactionReport";

import { format } from "date-fns";

import { useFilterContext } from "./NftTransactionReport";

export const NftDisplay = () => {
  /**
   * Displays the NFT image, and related information, only when filters have
   * been chosen to NFT level - id or iteration
   */

  const { nft, filterInfoComplete } = useFilterContext();

  return (
    filterInfoComplete && (
      <Paper elevation={6} sx={{ width: LEFT_COLUMN_WIDTH }}>
        <Stack pt={1} pb={1}>
          <NftHeader />
          <NftImageDisplay
            size={LEFT_COLUMN_WIDTH}
            imgAddress={ipfsLink(nft.thumbnail)}
            padding={2}
          />
          <NftFooter />
        </Stack>
      </Paper>
    )
  );
};

const NftHeader = () => {
  const { artist, collection } = useFilterContext();

  return (
    <>
      <Typography sx={{ fontStyle: "italic" }}>
        <CompositeLinkPrimaryUnderline
          linkLoc={fxCollectionLink(collection.id)}
        >
          {collection.name}
        </CompositeLinkPrimaryUnderline>
      </Typography>

      <Typography>
        by{" "}
        <CompositeLinkPrimaryUnderline linkLoc={fxArtistLink(artist.address)}>
          {artist.alias}
        </CompositeLinkPrimaryUnderline>
      </Typography>
    </>
  );
};

const NftFooter = () => {
  const { collection, nft } = useFilterContext();

  const monthText = (monthNumber) => {
    const date = new Date(2020, monthNumber - 1); // Create a date object for the month
    const monthName = format(date, "MMMM"); // 'MMMM' is the format for the full month name
    return monthName;
  };

  return (
    <>
      <Typography sx={{ fontStyle: "italic" }}>
        Edition #{nft.collection_iteration} of {collection.editions}
      </Typography>
      <Typography>
        Created in {monthText(nft.mint_month)}, {nft.mint_year}
      </Typography>
    </>
  );
};

export default NftDisplay;
