import { useState } from "react";

// Material UI components
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

// utility
import { axiosGet } from "../../../../lib/axiosUtility";

// constants
import { BACKEND_REQUEST_LIMIT } from "../../../../constants/backendRequests";

// context
import { useAccountOwner } from "./AccountOwnerContext";

const AccountOwnerFilter = () => {
  // Material UI Autocomplete functionality
  // looks up account possibilities after 4 characters
  // assigns AccountContext account details on selection

  const { setAccountOwner } = useAccountOwner();

  const [errorText, setErrorText] = useState(null);
  const [ownerOptions, setOwnerOptions] = useState([]);

  // responsive search, showing options each time user changes account text
  const handleInputChange = async (event, newValue) => {
    // search filter on typing 4 characters
    if (newValue.length >= 4) {
      const response = await axiosGet(
        `/owners?parent-address=${newValue}&limit=${BACKEND_REQUEST_LIMIT}`
      );
      if (response.success) {
        // add label but retain info
        const optionsArray = response.data.map((owner) => ({
          ...owner,
          label: owner.parent_address,
        }));
        setOwnerOptions(optionsArray);
        setErrorText(null);
      } else {
        setErrorText("Owner information not available");
      }
    }
  };

  const filterWidth = 400;

  return renderGridFormatting(
    <Autocomplete
      onChange={(event, newValue) => {
        setAccountOwner(newValue);
      }}
      onInputChange={handleInputChange} // accessible only if not read only
      disablePortal
      options={ownerOptions}
      sx={{
        width: {
          xs: 400,
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={"Account owner"}
          placeholder={"Tezos address - e.g. 'tz1...etc'"}
        />
      )}
    />,
    errorText
  );
};

const renderGridFormatting = (autocomplete, errorText) => {
  // md and above, autocomplete and error text left aligned and same line
  // xs and sm, error text below
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      align="left"
    >
      <Grid
        display="flex"
        justifyContent={{ xs: "center", md: "left" }}
        alignItems="center"
        size={{ xs: 12, md: "auto" }}
      >
        {autocomplete}
      </Grid>
      <Grid
        display="flex"
        justifyContent={{ xs: "center", md: "left" }}
        alignItems="center"
        size={{ xs: 12, md: "grow" }}
      >
        {errorText ? <Alert severity="error">{errorText}</Alert> : <></>}
      </Grid>
    </Grid>
  );
};

export default AccountOwnerFilter;
