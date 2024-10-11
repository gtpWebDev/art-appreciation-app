import Box from "@mui/material/Box";

const NftImageDisplay = ({ imgAddress, size, padding = 0 }) => {
  return (
    imgAddress && (
      <Box
        component="img"
        p={padding}
        sx={{ width: size, height: size }}
        src={imgAddress}
      />
    )
  );
};

export default NftImageDisplay;
