import { useContext } from "react";

// Material UI components
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// recharts
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

// context
import { ScoreReportContext } from "./scoreReportContext";

const CategorySection = () => {
  return (
    <Paper elevation={6}>
      <Grid container size={12} rowSpacing={{ xs: 1, md: 2 }} columnSpacing={0}>
        <Grid size={12}>
          <Typography variant="h4" pt={2}>
            Spend Categories
          </Typography>
        </Grid>
        <Grid size={12} align="center" p={2}>
          <Typography variant="body1">Content here </Typography>
        </Grid>
        <Grid size={6} align="center" p={1} sx={{ border: "solid black 1px" }}>
          <CategoryChart />
        </Grid>
      </Grid>
    </Paper>
  );
};

const CategoryChart = () => {
  // Vertical chart

  const { categoryData } = useContext(ScoreReportContext);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        layout="vertical" // This is the key change to make it horizontal
        data={categoryData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <Bar
          dataKey="num_owners"
          data={categoryData}
          fill="#8884d8"
          // label={({ payload }) =>
          //   `${payload.name}: ${formatMillionDollarCurrency(payload.spend, 1)}`
          // }
        >
          {/* <LabelList dataKey="art_dollars" position="right" /> */}
          <LabelList content={<CustomLabel position="right" />} />
        </Bar>

        <XAxis type="number" />

        <YAxis dataKey="category" type="category" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Custom label component
const CustomLabel = ({ x, y, value }) => (
  <text x={x + 10} y={y} fontSize={14} textAnchor="start">
    {value}
  </text>
);

export default CategorySection;
