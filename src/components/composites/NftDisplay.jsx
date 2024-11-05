import { useEffect, useState } from "react";

// Material UI components
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Styled components
import { CompositeLinkPrimaryUnderline } from "../styledComponents/links";

// Utility
import {
  ipfsLink,
  fxArtistLink,
  fxCollectionLink,
} from "../../utils/fxhashAddresses";
import { format } from "date-fns";

// hooks
import useGetBackendData from "../../hooks/useGetBackendData";

/**
 * A generic component for displaying NFTs, with:
 * - the collection and artist above
 * - the edition details below
 * - then free space below to add as required
 * Parameters:
 * - nft id is the backend database id for the Nft table in form "1ssvi_1345489"
 */

const NftDisplay = ({ nftId, containerWidth, imageWidth, children }) => {
  const endpoint = `/nfts/${nftId}/all-details`;

  // Retreive data in form {artist, collection, nft}
  const { data, loading, error } = useGetBackendData(endpoint);

  console.log("nft id", data ? data.nft.id : null);

  if (!loading)
    return (
      <Paper elevation={6} sx={{ width: containerWidth }}>
        <Grid container pt={1} pb={1} align="center">
          <Grid size={12}>
            <NftHeader artist={data.artist} collection={data.collection} />
          </Grid>
          <Grid size={12}>
            <NftImage
              size={imageWidth}
              imgAddress={ipfsLink(data.nft.thumbnail)}
              padding={2}
            />
          </Grid>
          <Grid size={12}>
            <NftFooter collection={data.collection} nft={data.nft} />
          </Grid>
          <Grid size={12}>{children}</Grid>
        </Grid>
      </Paper>
    );
};

const NftHeader = ({ artist, collection }) => {
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

const NftFooter = ({ collection, nft }) => {
  return (
    <>
      <Typography sx={{ fontStyle: "italic" }}>
        Edition #{nft.collection_iteration} of {collection.editions}
      </Typography>
    </>
  );
};

export const NftImage = ({ imgAddress, size, padding = 0 }) => {
  return (
    imgAddress && (
      <Box
        component="img"
        p={padding}
        sx={{ width: size, height: size }}
        src={imgAddress}
      />
    )
  );
};

export default NftDisplay;
