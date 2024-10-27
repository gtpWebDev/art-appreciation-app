import { useEffect, useState, useContext } from "react";

// Material UI components
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

// recharts
import {
  BarChart,
  Bar,
  ReferenceLine,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// utility
import { formatPercentage } from "../../../../utils/formatting";
import {
  getOwnerCategoryInfo,
  summariseOwnerSpend,
} from "../../../../utils/chartConstruction";

// context
import { ScoreReportContext } from "./scoreReportContext";

/**
 * Chart uses data of buckets of 100 owners,ordered by % art spend
 * Data excludes owners that have only ever bought free items as not possible
 * to calculate a % based on this.
 * Data also excludes %s less than zero, which can occur with selling accounts
 * which receive NFTs by transfer and only sell. (Will mostly resolve when
 * accounts are combined under owners).
 */

const ProfileSection = () => {
  const { bucketData } = useContext(ScoreReportContext);

  return (
    <Paper elevation={6}>
      <Grid container size={12}>
        <Grid size={12}>
          <Typography variant="h4" pt={2}>
            Account Profile
          </Typography>
        </Grid>
        <Grid size={12} align="center" p={1}>
          <Typography variant="body1">
            All accounts that have purchased NFTs on fx(hash) are ordered by art
            spend %
          </Typography>
        </Grid>
      </Grid>
      <Grid size={12} align="center" p={2} container>
        <ProfileChart chartData={bucketData} />
      </Grid>
    </Paper>
  );
};

const ProfileChart = ({ chartData }) => {
  // Collect together total spend and average spend per owner for each owner category
  useEffect(() => {
    const doit = summariseOwnerSpend(chartData);
    console.log(doit);
  }, [chartData]);

  // Receives chartData in format [{bucket: 1, bucket_average: 0.5}]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        {/* X-Axis */}
        <XAxis dataKey="bucket" type="category" />

        {/* Y-Axis for the bar chart series */}
        <YAxis
          label={{
            value: "% Art Spend",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle" },
          }}
          domain={[0, 1]}
          tickFormatter={(value) => formatPercentage(value)}
          tick={{ fontSize: "14px" }}
        />

        <Tooltip formatter={(value) => formatPercentage(value)} />

        {/* Custom Legend */}
        <Legend
          content={<CustomLegend />}
          verticalAlign="top"
          wrapperStyle={{ fontSize: "18px", paddingBottom: "10px" }}
        />

        {/* <Legend
          verticalAlign="top"
          wrapperStyle={{ fontSize: "18px", paddingBottom: "10px" }}
        /> */}

        {/* Bar colours dependent on value */}
        <Bar dataKey="bucket_average" name="Art Dollars" stackId="stack">
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getOwnerCategoryInfo(entry.bucket_average).color}
            />
          ))}
        </Bar>

        <ReferenceLine y={0.5} stroke="#000" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const CustomLegend = () => {
  return (
    <ul style={{ display: "flex", justifyContent: "center", padding: 0 }}>
      <li style={{ listStyleType: "none", marginRight: 10 }}>
        <span style={{ color: "green", fontWeight: "bold" }}>■</span> Art
        Collectors
      </li>
      <li style={{ listStyleType: "none", marginRight: 10 }}>
        <span style={{ color: "yellow", fontWeight: "bold" }}>■</span> Neutral
      </li>
      <li style={{ listStyleType: "none" }}>
        <span style={{ color: "blue", fontWeight: "bold" }}>■</span> Art for
        profit
      </li>
    </ul>
  );
};

export default ProfileSection;
