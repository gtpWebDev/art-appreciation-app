import { useState } from "react";

// material UI components
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { StyledFormControlLabel } from "../styledComponents/formControl";

const RowRadioGroup = ({ optionsArray, callback, defaultValue }) => {
  const [selection, setSelection] = useState(defaultValue);

  const handleChange = (event) => {
    setSelection(event.target.value);
    callback(event.target.value); // passes selection back to parent
  };

  return (
    <FormControl>
      <RadioGroup
        row
        name="radio-buttons-group"
        value={selection}
        onChange={handleChange}
        fontSize={10}
      >
        {optionsArray.map((option) => (
          <StyledFormControlLabel
            key={option.label}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RowRadioGroup;
