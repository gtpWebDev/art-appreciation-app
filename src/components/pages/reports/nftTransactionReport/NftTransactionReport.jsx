import { useState } from "react";
import { axiosGet } from "../../../../lib/axiosUtility";

// Constants
import {
  SEARCH_METHOD_ARTIST,
  SEARCH_METHOD_COLLECTION,
  SEARCH_METHOD_NFT,
} from "../../../../constants/uiConstants";

// Material UI components
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Styled components
import { ReversePaper } from "../../../styledComponents/paper";

// Custom hooks
import useVisibility from "../../../../hooks/useFilterVisibility";
import useNftDisplayData from "../../../../hooks/useNftDisplayData";

// Subcomponents
import NftFilters from "./NftFilters";
import TransactionDisplay from "./TransactionDisplay";
import NftDisplay from "./NftDisplay";

// defined collumn eidht, used in subcomponents
export const LEFT_COLUMN_WIDTH = 300;

const NftTransactionReport = () => {
  // custom hook to manage nftDisplayData object
  const { nftDisplayData, updateNftDisplayData } = useNftDisplayData({
    artist: null,
    collection: null,
    nft: null,
  });

  // Filter states
  const [artist, setArtist] = useState(null);
  const [collection, setCollection] = useState(null);
  const [nftId, setNftId] = useState(null);

  // Visibility hook which slightly tidies visibility management
  const [visibility, updateVisibility] = useVisibility({
    searchMethod: true,
    artist: false,
    collection: false,
    nftIteration: false,
    nftId: false,
  });

  // Callback functions for search filters
  const selectSearchMethod = (method) => {
    updateVisibility("artist", method === SEARCH_METHOD_ARTIST);
    updateVisibility("collection", method === SEARCH_METHOD_COLLECTION);
    updateVisibility("nftId", method === SEARCH_METHOD_NFT);
    updateVisibility("nftIteration", false);
    setArtist(null);
    setCollection(null);
    setNftId(null);

    updateNftDisplayData("artist", null);
    updateNftDisplayData("collection", null);
    updateNftDisplayData("nft", null);
  };

  // selecting an artist, make collection available
  // removing an artist, remove collection and nft iteration
  const selectArtist = async (artist) => {
    setArtist(artist);
    updateVisibility("collection", artist ? true : false);
    if (!artist) {
      updateVisibility("nftIteration", false);
      setCollection(null);
      setNftId(null);
    }

    if (artist) {
      const response = await axiosGet(`/artists/${artist}`);
      if (response.success) {
        updateNftDisplayData("artist", response.data);
      } else {
        console.log("Error collecting nft artist from backend", response.error);
      }
    } else {
      // Have to improve this!
      updateNftDisplayData("artist", null);
      updateNftDisplayData("collection", null);
      updateNftDisplayData("nft", null);
    }
  };

  // selecting a collection, make nft iteration available
  // removing a collection, remove nft iteration
  const selectCollection = async (coll) => {
    setCollection(coll);
    updateVisibility("nftIteration", coll ? true : false);
    setNftId(null);

    if (coll) {
      const response = await axiosGet(`/collections/${coll}`);
      if (response.success) {
        updateNftDisplayData("collection", response.data);
      } else {
        console.log(
          "Error collecting collection information from backend",
          response.error
        );
      }
    } else {
      updateNftDisplayData("collection", null);
      updateNftDisplayData("nft", null);
    }
  };

  // selecting an nft (iteration or id uses this function)
  const selectNftId = async (id) => {
    setNftId(id);
    if (id) {
      const response = await axiosGet(`/nfts/${id}`);
      if (response.success) {
        updateNftDisplayData("nft", response.data);
      } else {
        console.log(
          "Error collecting collection information from backend",
          response.error
        );
      }
    } else {
      updateNftDisplayData("nft", null);
    }
  };

  return (
    <>
      {/* Main container - full width */}
      <Grid container spacing={2} align="center">
        {/* Header - full width*/}
        <Grid size={12} mb={3}>
          <ReportHeader />
        </Grid>

        {/* Left column is the filters and the nft display - no size, natural width */}
        <Grid>
          <LeftColumn
            artist={artist}
            collection={collection}
            visibility={visibility}
            selectSearchMethod={selectSearchMethod}
            selectArtist={selectArtist}
            selectCollection={selectCollection}
            selectNftId={selectNftId}
            nftDisplayData={nftDisplayData}
          />
        </Grid>
        {/* Transaction display move to new line for xs and sm */}
        <Grid xs={12} md align="center">
          <TransactionDisplay nftData={nftDisplayData.nft} />
        </Grid>
      </Grid>
    </>
  );
};

const LeftColumn = ({
  artist,
  collection,
  visibility,
  selectSearchMethod,
  selectArtist,
  selectCollection,
  selectNftId,
  nftDisplayData,
}) => {
  return (
    <Stack spacing={3}>
      <NftFilters
        artist={artist}
        collection={collection}
        visibility={visibility}
        selectSearchMethod={selectSearchMethod}
        selectArtist={selectArtist}
        selectCollection={selectCollection}
        selectNftId={selectNftId}
      />
      <NftDisplay nftDisplayData={nftDisplayData} />
    </Stack>
  );
};

const ReportHeader = () => {
  return (
    <ReversePaper elevation={6} sx={{ alignItems: "center" }}>
      <Typography
        component="h3"
        variant="h3"
        color="primary.contrastText"
        sx={{ padding: "20px 0" }}
        align="center"
      >
        Individual Nft Report
      </Typography>
      {/* Remove when design complete */}
      <Grid
        size={12}
        color="black"
        backgroundColor={{
          xs: "red",
          sm: "orange",
          md: "yellow",
          lg: "green",
          xl: "purple",
        }}
        mb={3}
      >
        xs red, sm orange, md yellow, lg green, xl purple
      </Grid>
    </ReversePaper>
  );
};

export default NftTransactionReport;
