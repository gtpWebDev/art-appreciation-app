// Material UI components
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//utility
import { formatDollarCurrency } from "../../utils/formatting";

const VerticalRangeDisplay = ({ rangeDisplayMax, dataPoint }) => {
  const marks = [
    {
      value: -rangeDisplayMax,
      label: (
        <p style={{ textAlign: "left" }}>
          Speculator:&nbsp;
          {formatDollarCurrency(-rangeDisplayMax, 0)}
        </p>
      ),
    },
    {
      value: 0,
      label: (
        <p style={{ textAlign: "left" }}>
          Neutral:&nbsp;
          {formatDollarCurrency(0)}
        </p>
      ),
    },

    {
      value: rangeDisplayMax,
      label: (
        <p style={{ textAlign: "left" }}>
          Appreciator&nbsp;
          {formatDollarCurrency(rangeDisplayMax, 0)}
        </p>
      ),
    },
  ];

  return (
    <Paper elevation={2}>
      <Stack justifyContent="center" alignItems="center">
        <Box sx={{ height: { xs: 222, md: 300, lg: 222 } }} py={3}>
          <Slider
            defaultValue={dataPoint}
            value={dataPoint}
            marks={marks}
            min={-rangeDisplayMax}
            max={rangeDisplayMax}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => formatDollarCurrency(value, 0)}
            disabled // effectively read only
            orientation="vertical"
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default VerticalRangeDisplay;
