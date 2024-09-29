import TextField from "@mui/material/TextField";

/**
 * Annoyingly number inputs are quite problematic in material UI
 * The general type="number" approach apparently has imperfections
 * Typical approach is to use Base UI which I want to avoid.
 *
 * Prefer here to control the iteration input closely for a good UX.
 */

export const NumberInput = ({ params, label, placeholder, isReadOnly }) => {
  console.log("params", params);
  return (
    <TextField
      {...params}
      type="number"
      label={label}
      placeholder={placeholder}
      onKeyDown={isReadOnly ? (e) => e.preventDefault() : null} // Prevent typing on read only
    />
  );
};
