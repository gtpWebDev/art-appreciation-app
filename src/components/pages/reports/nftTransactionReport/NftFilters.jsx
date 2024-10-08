import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { axiosGet } from "../../../../lib/axiosUtility";

import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
// import Alert from "@mui/material/Alert";

import { NumberInput } from "../../../composites/NumberInput";

import { BACKEND_REQUEST_LIMIT } from "../../../../constants/backendRequests";

import { LEFT_COLUMN_WIDTH } from "./NftTransactionReport";

import { useFilterContext } from "./NftTransactionReport";

/**
 * Task of each filter is to (optionally) receive an id to populate list choices
 * Then to callback the object related to the user selection
 */

const NftFilters = () => {
  const {
    isArtistVisible,
    isCollectionVisible,
    isNftIterationVisible,
    isNftIdVisible,
  } = useFilterContext();

  return (
    <Stack spacing={1}>
      <SearchMethodSelector />

      {isArtistVisible && <ArtistSelector />}

      {isCollectionVisible && <CollectionSelector />}

      {isNftIdVisible && <NftIdSelector />}

      {isNftIterationVisible && <NftIterationSelector />}
    </Stack>
  );
};

export const SearchMethodSelector = () => {
  // Search method information updated through context callback function

  const { handleSearchMethodChange } = useFilterContext();

  const searchMethodOptions = ["Artist", "Collection", "Nft"];

  const autocomplete = (
    <Autocomplete
      onChange={(event, newValue) => {
        handleSearchMethodChange(newValue);
      }}
      disablePortal
      options={searchMethodOptions}
      sx={{
        width: LEFT_COLUMN_WIDTH,
      }}
      renderInput={(params) => <TextField {...params} label="Search by..." />}
    />
  );

  return renderCommonGridFormatting(autocomplete);
};

export const ArtistSelector = () => {
  // Visible when artist search method chosen
  // Artist information updated through context callback function

  const { handleArtistChange } = useFilterContext();

  const [errorText, setErrorText] = useState(null);
  const [artistOptions, setArtistOptions] = useState([]);

  // responsive search, showing options each time user changes artist text
  const handleInputChange = async (event, newValue) => {
    // search filter on typing 3 characters
    if (newValue.length >= 3) {
      const response = await axiosGet(
        `/artists?alias=${newValue}&limit=${BACKEND_REQUEST_LIMIT}`
      );
      if (response.success) {
        // add label but retain info
        const optionsArray = response.data.map((artist) => ({
          ...artist,
          label: artist.alias,
        }));
        setArtistOptions(optionsArray);
        setErrorText(null);
      } else {
        setErrorText("Artist information not available");
      }
    }
  };

  return renderCommonGridFormatting(
    renderAutocomplete(
      "Artist", // label
      artistOptions,
      handleInputChange,
      handleArtistChange,
      false // user input autocomplete
    ),
    errorText
  );
};

export const CollectionSelector = () => {
  /**
   * Case 1 - receive artist - display and allow only relevant collections
   * Case 2 - no artist received - normal user autocomplete
   */

  const { artist, handleCollectionChange } = useFilterContext();

  const [errorText, setErrorText] = useState(null);
  const [collectionOptions, setCollectionOptions] = useState([]);

  // If artist passed to component, get collections matching the artist
  useEffect(() => {
    const getCollections = async () => {
      const response = await axiosGet(`/artists/${artist.id}/collections`);
      if (response.success) {
        const optionsArray = response.data.map((coll) => ({
          ...coll,
          label: coll.name,
        }));
        setCollectionOptions(optionsArray);
      } else {
        setErrorText("Not available");
      }
    };
    if (artist) getCollections();
  }, [artist]);

  // responsive text search
  const handleInputChange = async (event, newValue) => {
    if (newValue.length >= 3) {
      setCollectionOptions([
        {
          label: "placeholder",
          id: 1,
        },
      ]);
      const response = await axiosGet(
        `/collections?name=${newValue}&limit=${BACKEND_REQUEST_LIMIT}`
      );
      if (response.success) {
        const optionsArray = response.data.map((coll) => ({
          ...coll,
          label: coll.name,
        }));
        setCollectionOptions(optionsArray);
        setErrorText(null);
      } else {
        setErrorText("Not available");
      }
    }
  };

  return artist
    ? collectionOptions &&
        renderCommonGridFormatting(
          renderAutocomplete(
            "Collection", // label
            collectionOptions,
            handleInputChange,
            handleCollectionChange,
            true // read only autocomplete
          ),
          errorText
        )
    : renderCommonGridFormatting(
        renderAutocomplete(
          "Collection", // label
          collectionOptions,
          handleInputChange,
          handleCollectionChange,
          false // user input autocomplete
        ),
        errorText
      );
};

export const NftIterationSelector = () => {
  /**
   * Component rendered when collection method, or artist is chosen:
   *  - receive and display collection nfts
   *  - user autocomplete available
   *  - nft information updated through context callback function
   */

  const { collection, handleNftChange } = useFilterContext();

  const [errorText, setErrorText] = useState(null);
  const [nftIterationOptions, setNftIterationOptions] = useState([]);

  // if collection exists, get matching nfts
  useEffect(() => {
    const getNfts = async () => {
      const response = await axiosGet(
        `/collections/${collection.id}/nfts?limit=${BACKEND_REQUEST_LIMIT}`
      );
      if (response.success) {
        const optionsArray = response.data.map((nft) => ({
          ...nft,
          label: nft.collection_iteration.toString(),
        }));
        setNftIterationOptions(optionsArray);
      } else {
        setErrorText("Nft iterations not available");
      }
    };
    if (collection) getNfts();
  }, [collection]);

  const handleInputChange = async (event, newValue) => {
    const response = await axiosGet(
      `/collections/${collection.id}/nfts?limit=${BACKEND_REQUEST_LIMIT}&iteration=${newValue}`
    );
    if (response.success) {
      const optionsArray = response.data.map((nft) => ({
        ...nft,
        label: nft.collection_iteration.toString(),
      }));
      setNftIterationOptions(optionsArray);
      setErrorText(
        response.data.length === 0 ? "Iteration does not exist" : null
      );
    } else {
      setErrorText("Nft iterations not available");
    }
  };

  return renderCommonGridFormatting(
    renderNumberAutocomplete(
      "Nft iteration", // label
      nftIterationOptions,
      handleInputChange,
      handleNftChange,
      false // user input autocomplete
    ),
    errorText
  );
};

export const NftIdSelector = () => {
  // Visible when nft search method chosen
  // Nft information updated through context callback function

  const { handleNftChange } = useFilterContext();

  const [errorText, setErrorText] = useState(null);
  const [nftOptions, setNftIdOptions] = useState([]);

  // responsive search, showing options each time user changes nft text
  const handleInputChange = async (event, newValue) => {
    // search filter on typing 3 characters
    if (newValue.length >= 3) {
      const response = await axiosGet(
        `/nfts?id=${newValue}&limit=${BACKEND_REQUEST_LIMIT}`
      );
      if (response.success) {
        // map response to form required by autocomplete
        const optionsArray = response.data.map((nft) => ({
          ...nft,
          label: nft.id,
        }));
        setNftIdOptions(optionsArray);
        setErrorText(null);
      } else {
        setErrorText("Nft information not available");
      }
    }
  };

  return renderCommonGridFormatting(
    renderAutocomplete(
      "Nft id", // label
      nftOptions,
      handleInputChange,
      handleNftChange,
      false // user input autocomplete
    ),
    errorText
  );
};

const renderCommonGridFormatting = (autocomplete) => {
  return (
    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} align="left">
      <Grid display="flex" alignItems="center" size="auto">
        {autocomplete}
      </Grid>
      {/* <Grid display="flex" alignItems="center" size={{ xs: 12, md: "grow" }}>
        {errorText ? <Alert severity="error">{errorText}</Alert> : <></>}
      </Grid> */}
    </Grid>
  );
};

/**
 * renderAutocomplete function
 * @param {string} label - autocomplete label
 * @param {Array[Object]} options - displayed options in autocomplete
 * @param {function()} handleInputChange - function to handle user input changes
 * @param {callback} selectCallback - callback function on autocomplete selection
 * @param {boolean} isReadOnly - whether user can input text
 */

const renderAutocomplete = (
  label,
  options,
  handleInputChange,
  selectCallback,
  isReadOnly
) => {
  return (
    <Autocomplete
      onChange={(event, newValue) => {
        selectCallback(newValue);
      }}
      onInputChange={!isReadOnly ? handleInputChange : null} // accessible only if not read only
      disablePortal
      options={options}
      sx={{
        width: LEFT_COLUMN_WIDTH,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          onKeyDown={isReadOnly ? (e) => e.preventDefault() : null} // Prevent typing on read only
        />
      )}
    />
  );
};

/**
 * renderNumberAutocomplete function
 * @param {string} label - autocomplete label
 * @param {Array[Object]} options - displayed options in autocomplete
 * @param {function()} handleInputChange - function to handle user input changes
 * @param {callback} selectCallback - callback function on autocomplete selection
 * @param {boolean} isReadOnly - whether user can input text
 */
const renderNumberAutocomplete = (
  label,
  options,
  handleInputChange,
  selectCallback,
  isReadOnly
) => {
  return (
    <Autocomplete
      onChange={(event, newValue) => {
        selectCallback(newValue);
      }}
      onInputChange={!isReadOnly ? handleInputChange : null} // accessible only if not read only
      disablePortal
      options={options}
      sx={{ width: LEFT_COLUMN_WIDTH }}
      renderInput={(params) => (
        <NumberInput
          params={params}
          label={label}
          placeholder="e.g. '12'"
          isReadOnly={isReadOnly}
        />
      )}
    />
  );
};

export default NftFilters;
