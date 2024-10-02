import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { axiosGet } from "../../../../lib/axiosUtility";

import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

import { NumberInput } from "../../../composites/NumberInput";

import { BACKEND_REQUEST_LIMIT } from "../../../../constants/backendRequests";

import { LEFT_COLUMN_WIDTH } from "./NftTransactionReport";

/**
 * Task of each filter is to (optionally) receive an id to populate list choices
 * Then to callback the object related to the user selection
 */

const NftFilters = ({
  artist,
  collection,
  visibility,
  selectSearchMethod,
  selectArtist,
  selectCollection,
  selectNftId,
}) => {
  return (
    <Stack spacing={1}>
      <SearchMethodSelector selectSearchMethod={selectSearchMethod} />

      {visibility.artist && <ArtistSelector selectArtist={selectArtist} />}

      {visibility.collection && (
        <CollectionSelector
          artist={artist}
          selectCollection={selectCollection}
        />
      )}

      {/* {nftIdFilterVisible && (
            <Grid size={{ xs: 12 }} align="left">
              <NftIdSelector selectNftId={selectNftId} />
            </Grid>
          )} */}

      {visibility.nftIteration && (
        <NftIterationSelector
          collection={collection}
          selectNftId={selectNftId}
        />
      )}
    </Stack>
  );
};

/**
 * SearchMethodSelector component - autocomplete function for selecting search method
 * @param {selectSearchMethod} callback - function to handle selection of the search method
 */

export const SearchMethodSelector = ({ selectSearchMethod }) => {
  // Simple autocomplete, passing back search method choice

  const searchMethodOptions = ["Artist", "Collection", "Nft"];

  const autocomplete = (
    <Autocomplete
      onChange={(event, newValue) => {
        selectSearchMethod(newValue);
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

/**
 * ArtistSelector component - autocomplete function for selecting artist
 * @param {selectArtist} callback - function to handle selection of the artist
 */

export const ArtistSelector = ({ selectArtist }) => {
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
        // map response to form required by autocomplete
        const optionsArray = response.data.map((artist) => ({
          label: artist.alias,
          id: artist.id,
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
      selectArtist,
      false // user input autocomplete
    ),
    errorText
  );
};

/**
 * CollectionSelector component - autocomplete function for selecting collection
 * @param {artist} callback - artist id - if null, component allows user to type in any collection text, otherwise constrains collections to those by the artist
 * @param {selectCollection} callback - function to pass collection selection back to parent component
 */

export const CollectionSelector = ({ artist, selectCollection }) => {
  /**
   * Case 1 - receive artist - display and allow only relevant collections
   * Case 2 - no artist received - normal user autocomplete
   */

  const [errorText, setErrorText] = useState(null);
  const [collectionOptions, setCollectionOptions] = useState([]);

  // If artist passed to component, get collections matching the artist
  useEffect(() => {
    const getCollection = async () => {
      const response = await axiosGet(`/artists/${artist}/collections`);
      if (response.success) {
        const optionsArray = response.data.map((coll) => ({
          label: coll.name,
          id: coll.id,
        }));
        setCollectionOptions(optionsArray);
      } else {
        setErrorText("Not available");
      }
    };
    if (artist) getCollection();
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
        const optionsArray = response.data.map((artist) => ({
          label: artist.name,
          id: artist.id,
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
            selectCollection,
            true // read only autocomplete
          ),
          errorText
        )
    : renderCommonGridFormatting(
        renderAutocomplete(
          "Collection", // label
          collectionOptions,
          handleInputChange,
          selectCollection,
          false // user input autocomplete
        ),
        errorText
      );
};

export const NftIterationSelector = ({ collection, selectNftId }) => {
  /**
   * Component rendered only when collection is chosen.
   *  - receive and display collection nfts
   *  - user autocomplete available
   */

  const [errorText, setErrorText] = useState(null);
  const [nftIterationOptions, setNftIterationOptions] = useState([]);

  // if artist exists, get nfts matching the collection
  useEffect(() => {
    const getCollection = async () => {
      const response = await axiosGet(
        `/collections/${collection}/nfts?limit=${BACKEND_REQUEST_LIMIT}`
      );
      if (response.success) {
        const optionsArray = response.data.map((nft) => ({
          label: nft.collection_iteration.toString(),
          id: nft.id,
        }));
        setNftIterationOptions(optionsArray);
      } else {
        setErrorText("Nft iterations not available");
      }
    };
    getCollection();
  }, [collection]);

  const handleInputChange = async (event, newValue) => {
    const response = await axiosGet(
      `/collections/${collection}/nfts?limit=${BACKEND_REQUEST_LIMIT}&iteration=${newValue}`
    );
    if (response.success) {
      const optionsArray = response.data.map((nft) => ({
        label: nft.collection_iteration.toString(),
        id: nft.id,
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
      selectNftId,
      false // user input autocomplete
    ),
    errorText
  );
};

export const NftIdSelector = (props) => {
  const collectionOptions = [
    { label: "1", id: 1 },
    { label: "2", id: 2 },
  ];

  return (
    <>
      <Autocomplete
        onChange={(event, newValue) => {
          props.selectNftId(newValue);
        }}
        disablePortal
        options={collectionOptions}
        sx={{
          width: LEFT_COLUMN_WIDTH,
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Nft id"
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        )}
      />
    </>
  );
};

const renderCommonGridFormatting = (autocomplete, errorText) => {
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
        selectCallback(newValue ? newValue.id : null);
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
        selectCallback(newValue ? newValue.id : null);
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
