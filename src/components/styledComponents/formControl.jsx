import FormControlLabel from "@mui/material/FormControlLabel";

import { styled } from "@mui/system";

export const StyledFormControlLabel = styled(FormControlLabel)({
  "& .MuiFormControlLabel-label": {
    fontSize: "16px", // Change font size only
  },
  "& .MuiSvgIcon-root": {
    fontSize: 24, // Changes button size only
  },
});
