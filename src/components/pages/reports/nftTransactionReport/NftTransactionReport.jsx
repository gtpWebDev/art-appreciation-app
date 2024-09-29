import useGetBackendData from "../../../../hooks/useGetBackendData";
import Loading from "../../../composites/Loading";

import { useState } from "react";

import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import {
  SearchMethodSelector,
  ArtistSelector,
  CollectionSelector,
  NftIterationSelector,
  NftIdSelector,
} from "./nftFilters";

import {
  SEARCH_METHOD_ARTIST,
  SEARCH_METHOD_COLLECTION,
  SEARCH_METHOD_NFT,
} from "../../../../constants/uiConstants";

const NftTransactionReport = () => {
  // filter states
  const [artist, setArtist] = useState(null);
  const [collection, setCollection] = useState(null);
  const [nftIteration, setNftIteration] = useState(null);
  const [nftId, setNftId] = useState(null);

  const resetFilters = () => {
    setArtist(null);
    setCollection(null);
    setNftIteration(null);
    setNftId(null);
  };

  // filter visibility
  const [artistFilterVisible, setArtistFilterVisible] = useState(false);
  const [collectionFilterVisible, setCollectionFilterVisible] = useState(false);
  const [nftIdFilterVisible, setNftIdFilterVisible] = useState(false);
  const [nftIterationFilterVisible, setNftIterationFilterVisible] =
    useState(false);

  const [displayNftData, setDisplayNftData] = useState(false);

  //  Search method selection resets filter contents and displays relevant filter
  const [searchMethod, setSearchMethod] = useState(null);
  const selectSearchMethod = (method) => {
    setSearchMethod(method);
    setArtistFilterVisible(method === SEARCH_METHOD_ARTIST);
    setCollectionFilterVisible(method === SEARCH_METHOD_COLLECTION);
    setNftIdFilterVisible(method === SEARCH_METHOD_NFT);
    setNftIterationFilterVisible(false); // only available through artist/collection filters
    resetFilters();
  };

  // Artist selected - display collection filter
  const selectArtist = (artist) => {
    setArtist(artist); // Database Artist id
    setCollectionFilterVisible(artist ? true : false);
    setNftIterationFilterVisible(artist ? true : false);
  };

  // Collection selected - display nft filter option
  const selectCollection = (coll) => {
    console.log("coll", coll);
    setCollection(coll);
    setNftIterationFilterVisible(coll ? true : false);
  };

  // to do
  // const selectNftIteration = (iter) => {
  //   setNftIteration(iter);
  //   console.log("DISPLAY THE NFT INFO!");
  //   setDisplayNftData(iter ? true : false);
  // };
  const selectNftId = (id) => {
    setNftId(id);
    console.log("DISPLAY THE NFT INFO!");
    setDisplayNftData(id ? true : false);
  };

  return (
    <>
      <Grid container spacing={2} align="center">
        <Grid size={{ xs: 12 }} align="left">
          <SearchMethodSelector selectSearchMethod={selectSearchMethod} />
        </Grid>
        {artistFilterVisible && (
          <Grid size={{ xs: 12 }} align="left">
            <ArtistSelector selectArtist={selectArtist} />
          </Grid>
        )}
        {collectionFilterVisible && (
          <Grid size={{ xs: 12 }} align="left">
            <CollectionSelector
              artist={artist}
              selectCollection={selectCollection}
            />
          </Grid>
        )}
        {/* {nftIdFilterVisible && (
          <Grid size={{ xs: 12 }} align="left">
            <NftIdSelector selectNftId={selectNftId} />
          </Grid>
        )} */}
        {nftIterationFilterVisible && (
          <Grid size={{ xs: 12 }} align="left">
            <NftIterationSelector
              selectNftId={selectNftId}
              collection={collection}
            />
          </Grid>
        )}

        {displayNftData && (
          <NftDisplay artist={artist} collection={collection} nftId={nftId} />
        )}
      </Grid>
    </>
  );
};

const NftDisplay = ({ artist, collection, nftId }) => {
  return (
    <Grid size={{ xs: 12 }} align="center">
      <Grid container align="center">
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          Collection information
          <br />
          Artist id: {artist}
          <br />
          Collection: {collection}
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>Image of Collection </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          Nft information
          <br />
          Nft id: {nftId}
          <br />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>Image of Nft </Grid>
        <Grid size={{ xs: 12 }}>Nft Data </Grid>
      </Grid>
    </Grid>
  );
};

export default NftTransactionReport;
