import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingCircle = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="200px"
      width="100%"
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingCircle;
