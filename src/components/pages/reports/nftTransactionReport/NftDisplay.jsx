// Material UI components
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Styled components
import { CompositeLinkUnderline } from "../../../styledComponents/links";

// Utility
import { shortenAddress } from "../../../../utils/textFunctions";

import { LEFT_COLUMN_WIDTH } from "./NftTransactionReport";

import { format } from "date-fns";

export const NftDisplay = ({ nftDisplayData }) => {
  /**
   * Displays the NFT image, and related information, only when filters have
   * been chosen to NFT level - id or iteration
   */

  const getImgAddress = (thumbnailAddress) => {
    const removedIpfs = thumbnailAddress.replace("ipfs://", "");
    return `https://gateway.fxhash2.xyz/ipfs/${removedIpfs}`;
  };

  return (
    nftDisplayData.nft && (
      <Paper elevation={6}>
        <Stack pt={1} pb={1}>
          <NftHeader nftDisplayData={nftDisplayData} />
          <NftImageDisplay
            size={LEFT_COLUMN_WIDTH}
            imgAddress={getImgAddress(nftDisplayData.nft.thumbnail)}
          />
          <NftFooter nftDisplayData={nftDisplayData} />
        </Stack>
      </Paper>
    )
  );
};

const NftImageDisplay = ({ imgAddress, size }) => {
  return (
    imgAddress && (
      <Box
        component="img"
        p={2}
        sx={{ width: size, height: size }}
        src={imgAddress}
      />
    )
  );
};

const NftHeader = ({ nftDisplayData }) => {
  const fxArtistLink = (address) => `https://www.fxhash.xyz/u/${address}`;
  const fxCollectionLink = (id) => `https://www.fxhash.xyz/generative/${id}`;

  return (
    <>
      <Typography sx={{ fontStyle: "italic" }}>
        <CompositeLinkUnderline
          linkLoc={fxCollectionLink(nftDisplayData.collection.id)}
        >
          {nftDisplayData.collection.name}
        </CompositeLinkUnderline>
      </Typography>

      <Typography>
        by{" "}
        <CompositeLinkUnderline
          linkLoc={fxArtistLink(nftDisplayData.artist.address)}
        >
          {nftDisplayData.artist.alias}
        </CompositeLinkUnderline>
      </Typography>
    </>
  );
};

const NftFooter = ({ nftDisplayData }) => {
  const monthText = (monthNumber) => {
    const date = new Date(2020, monthNumber - 1); // Create a date object for the month
    const monthName = format(date, "MMMM"); // 'MMMM' is the format for the full month name
    return monthName;
  };

  return (
    <>
      <Typography sx={{ fontStyle: "italic" }}>
        Edition #{nftDisplayData.nft.collection_iteration} of{" "}
        {nftDisplayData.collection.editions}
      </Typography>
      <Typography>
        Created in {monthText(nftDisplayData.nft.mint_month)},{" "}
        {nftDisplayData.nft.mint_year}
      </Typography>
    </>
  );
};

export default NftDisplay;
