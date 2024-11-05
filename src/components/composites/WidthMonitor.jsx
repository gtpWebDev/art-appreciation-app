import Grid from "@mui/material/Grid2";

const WidthMonitor = () => {
  return (
    <Grid
      size={12}
      color="black"
      backgroundColor={{
        xs: "red",
        sm: "orange",
        md: "yellow",
        lg: "green",
        xl: "purple",
      }}
    >
      xs red, sm orange, md yellow, lg green, xl purple
    </Grid>
  );
};

export default WidthMonitor;
