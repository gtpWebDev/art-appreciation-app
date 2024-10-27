import { useEffect, useState, useContext } from "react";

// Material UI components
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

// recharts
import { PieChart, Pie, ResponsiveContainer } from "recharts";

// utility
import {
  formatPercentage,
  formatNumber,
  formatMillionDollarCurrency,
} from "../../../../utils/formatting";
import {
  getOwnerCategoryInfo,
  summariseOwnerSpend,
} from "../../../../utils/chartConstruction";

// context
import { ScoreReportContext } from "./scoreReportContext";

const TopLevelSection = () => {
  const { allOwnersData } = useContext(ScoreReportContext);

  return (
    <Paper elevation={6}>
      <Grid container size={12}>
        <Grid size={12}>
          <Typography variant="h4" pt={2}>
            Top Level
          </Typography>
        </Grid>
        <Grid size={6} align="center" p={1}>
          <Typography variant="body1">
            {formatNumber(allOwnersData.num_owners, 0)} account owners have
            spent&nbsp;
            {formatMillionDollarCurrency(allOwnersData.total_spend_usd, 1)} on
            NFTs since November 2021
          </Typography>
        </Grid>
        <Grid size={6} align="center" p={1} sx={{ border: "solid black 1px" }}>
          <TotalSpendPieChart />
        </Grid>
      </Grid>
    </Paper>
  );
};

const TotalSpendPieChart = () => {
  const { allOwnersData } = useContext(ScoreReportContext);

  const chartArray = [
    {
      name: "Art Spend",
      spend: allOwnersData.art_dollars,
      value: allOwnersData.art_dollars / allOwnersData.total_spend_usd,
    },
    {
      name: "Speculate Spend",
      spend: allOwnersData.speculate_dollars,
      value: allOwnersData.speculate_dollars / allOwnersData.total_spend_usd,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={90}
          data={chartArray}
          cx="100%" // shunt over to
          cy="100%"
          outerRadius={200}
          fill="#8884d8"
          label={({ payload }) =>
            `${payload.name}: ${formatMillionDollarCurrency(payload.spend, 1)}`
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TopLevelSection;
