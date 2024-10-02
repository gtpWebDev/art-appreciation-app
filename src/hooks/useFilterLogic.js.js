import { useState } from "react";

const SEARCH_METHOD_ARTIST = "Artist";
const SEARCH_METHOD_COLLECTION = "Collection";
const SEARCH_METHOD_NFT = "Nft";

/**
 * Custom hook to tidy management of nft transaction report filter
 * visibility a little.
 * Nice structure for an object state variable.
 */

const useFilterLogic = () => {
  // ***FILTER STATE VARIABLES
  // note, these are not the filter values, as they will hold the full element object, not just an id
  const [searchMethod, setSearchMethod] = useState(null);
  const [artist, setArtist] = useState(null);
  const [collection, setCollection] = useState(null);
  const [nft, setNft] = useState(null);

  // ***FILTER VISIBILITY LOGIC***

  // artist filter visible whenever search method is set to artist
  const isArtistVisible = searchMethod === SEARCH_METHOD_ARTIST;
  // collection visible - either search method is set to collection, or artist chosen
  const isCollectionVisible =
    searchMethod === SEARCH_METHOD_COLLECTION || !!artist;
  // nft iteration visible - if collection chosen only
  const isNftIterationVisible = !!collection;
  // nft id visible - if search method is set to nft only
  const isNftIdVisible = searchMethod === SEARCH_METHOD_NFT;

  // ***HANDLING CHANGES TO STATE***

  // When search method changes, reset all
  const handleSearchMethodChange = (method) => {
    setSearchMethod(method);
    setArtist(null);
    setCollection(null);
    setNft(null);
  };

  // When artist changes, reset collection and nft
  const handleArtistChange = (artist) => {
    setArtist(artist);
    setCollection(null);
    setNft(null);
  };

  // When collection changes, reset nft
  const handleCollectionChange = (coll) => {
    setCollection(coll);
    setNft(null);
  };

  // When collection changes, reset nft
  const handleNftIterationChange = (nft) => {
    setNft(nft);
  };

  // When collection changes, reset nft
  const handleNftIdChange = (nft) => {
    setNft(nft);
  };

  return {
    // state variables
    searchMethod,
    artist,
    collection,
    nft,
    // visibility flags
    isArtistVisible,
    isCollectionVisible,
    isNftIterationVisible,
    isNftIdVisible,
    // handlers
    handleSearchMethodChange,
    handleArtistChange,
    handleCollectionChange,
    handleNftIterationChange,
    handleNftIdChange,
  };
};

export default useVisibility;
