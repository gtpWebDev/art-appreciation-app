import { useState } from "react";

import { axiosGet } from "../lib/axiosUtility";

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

  // Note, searchMethod is always visible

  // artist filter visible whenever search method is set to artist
  const isArtistVisible = searchMethod === SEARCH_METHOD_ARTIST;
  // collection visible - either:
  // - collection search method, or
  // - artist chosen but not nft id search method
  const isCollectionVisible =
    searchMethod === SEARCH_METHOD_COLLECTION ||
    (!!artist && searchMethod !== SEARCH_METHOD_NFT);
  // nft iteration visible:
  // - collection chosen but not nft id search method
  const isNftIterationVisible =
    !!collection && searchMethod !== SEARCH_METHOD_NFT;
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

  // Artist change - collect artist info, reset collection and nft
  const handleArtistChange = async (artist) => {
    setArtist(artist);
    setCollection(null);
    setNft(null);
  };

  // Collection change - collect collection info, reset nft
  const handleCollectionChange = async (coll) => {
    setCollection(coll);
    setNft(null);
  };

  // Nft change - collect nft info
  const handleNftChange = async (nft) => {
    // console.log("Changing hook nft to:", nft);
    setNft(nft);
    await completeFilterInformation(nft);
  };

  /**
   * Because there are routes to identifying the nft which don't collect artist or
   * collection, this function checks all information is complete
   * Have been a bit lazy, avoiding a new endpoint, using sequenced queries as they're fast.
   */
  const completeFilterInformation = async (nft) => {
    try {
      let artistId = null;
      if (collection) {
        artistId = collection.artist_id;
      } else {
        // effectively if nft id route
        const response = await axiosGet(`/collections/${nft.collection_id}`);
        if (response.success) {
          artistId = response.data.artist_id;
          setCollection(response.data);
        } else {
          throw new Error("Collection request failed");
        }
      }
      if (!artist) {
        // again, effectively if nft id route
        const response = await axiosGet(`/artists/${artistId}`);
        if (response.success) {
          setArtist(response.data);
        } else {
          throw new Error("Artist request failed");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // *** FINAL UTILITY PROPERTY ***
  // used to open up subcomponents
  const filterInfoComplete = artist && collection && nft;

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
    handleNftChange,
    filterInfoComplete,
  };
};

export default useFilterLogic;
