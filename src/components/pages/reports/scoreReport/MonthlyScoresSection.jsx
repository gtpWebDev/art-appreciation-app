import { useEffect, useState } from "react";

// Material UI components
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// recharts
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// subcomponents
import LoadingCircle from "../../../composites/LoadingCircle";

// hooks
import useGetBackendData from "../../../../hooks/useGetBackendData";

// utility
import { formatMillionDollarCurrency } from "../../../../utils/formatting";

import restructureScoresData from "../../../../utils/monthlyScoresRestructure";

/**
 * Section formatting component
 */
const MonthlyScoresSection = () => {
  return (
    <Paper elevation={6}>
      <Grid container size={12} rowSpacing={{ xs: 1, md: 2 }} columnSpacing={0}>
        <Grid size={12}>
          <Typography variant="h4" pt={2}>
            Scores Over Time
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="body1" px={4} align="left">
            Art dollars is the amount spent with an intention of keeping the
            art.
          </Typography>
          <Typography variant="body1" px={4} align="left">
            Speculate dollars is the amount spent with an intention on eslling
            for profit.
          </Typography>
          <Typography variant="body1" px={4} align="left">
            A positive net spend means more money is being spent on the
            collection and appreciation of art. A negative net spend means more
            money is being spent on art for the purpose of profit.
          </Typography>
        </Grid>
        <Grid size={12} align="center" px={5}>
          <Paper elevation={3}>
            <MonthlyScoresContent />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

const MonthlyScoresContent = () => {
  // hook for collecting monthly purchase data
  const { loading, error, data } = useGetBackendData(`score/monthly`);

  return (
    <>
      {loading ? (
        <FormattedLoadingCircle />
      ) : (
        <Grid size={12} sx={{ pt: { xs: 0, md: 1 } }}>
          <MonthlyScoresChart data={data} />
        </Grid>
      )}
    </>
  );
};

const MonthlyScoresChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const restructuredData = restructureScoresData(data);
    setChartData(restructuredData);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={chartData}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        stackOffset="sign" // this brings the two bar series to the same point on the x axis
      >
        {/* X-Axis */}
        <XAxis dataKey="name" type="category" />

        {/* Y-Axis for the bar chart series */}
        <YAxis
          yAxisId="left"
          orientation="left"
          tickFormatter={(value) => formatMillionDollarCurrency(value, 1)}
          tick={{ fontSize: "14px" }}
        />

        <Tooltip formatter={(value) => formatMillionDollarCurrency(value, 1)} />
        <Legend
          verticalAlign="top"
          wrapperStyle={{ fontSize: "18px", paddingBottom: "10px" }}
        />

        {/* Stacked Bar Series 1 (Positive values) */}
        <Bar
          yAxisId="left"
          dataKey="artDollars"
          fill="#4caf50"
          name="Art Dollars"
          stackId="stack"
        />

        {/* Stacked Bar Series 2 (Negative values) */}
        <Bar
          yAxisId="left"
          dataKey="speculateDollars"
          fill="#dc004e"
          name="Speculate Dollars"
          stackId="stack"
        />

        {/* Line Series */}
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="totalScoreUsd"
          stroke="#413ea0"
          name="Net Spend"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

// look at final formatting need and likely move to styledComponents
const FormattedLoadingCircle = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="200px"
      width="100%"
    >
      <LoadingCircle />
    </Box>
  );
};

export default MonthlyScoresSection;
