import { useEffect, useState, useContext } from "react";

// Material UI components
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";

// subcomponents
import LoadingCircle from "./LoadingCircle";
import RowRadioGroup from "./RadioGroup";

// context
import { AccountOwnerContext } from "../pages/reports/accountOwnerReport/AccountOwnerReport";

// hooks
import useGetBackendData from "../../hooks/useGetBackendData";

// utility
import {
  formatMillionDollarCurrency,
  formatMillionTezosCurrency,
  formatMillionNumber,
} from "../../utils/formatting";

import restructureData from "../../utils/monthlyPurchasesRestructure";

/**
 * Monthly purchases chart, with stacked data (Primary and Secondary purchases)
 * Embedded radio buttons to select currency - Usd or Tz - or number of purchases
 * Responsive chart, which fits inside its container.
 * Props:
 * - data - array of data for chart
 *
 */

const MonthlyPurchasesChart = ({ height }) => {
  // hook for collecting monthly purchase data
  const { loading, error, data } = useGetBackendData(
    `http://localhost:3000/purchases/by-month`
  );

  /** Data of form:
  {
    "transaction_type": "primary_purchase",
    "transaction_year": 2021,
    "transaction_month": 11,
    "sum_price_usd": "952813.118387",
    "sum_price_tz": "184019.472604",
    "count": 88513
  },
  */

  return (
    <Grid container p={2} columnSpacing={2}>
      {loading ? (
        <LoadingCircle />
      ) : (
        <Grid size={12} sx={{ pt: { xs: 0, md: 1 } }}>
          <Chart data={data} height={height} />
        </Grid>
      )}
    </Grid>
  );
};

const Chart = ({ data, height = 250 }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // restructure backend data into required form
    const restructuredData = restructureData(data);
    console.log("restructuredData", restructuredData);
    setChartData(restructuredData);
  }, [data]);

  // state variable for deciding which unit to display in chart
  const [chartUnit, setChartUnit] = useState("Usd");
  const handleChartUnitChange = (value) => setChartUnit(value);

  const optionsArray = [
    {
      label: "Usd",
      value: "Usd",
      primary: "primaryPurchaseUsd",
      secondary: "secondaryPurchaseUsd",
    },
    {
      label: "Tz",
      value: "Tz",
      primary: "primaryPurchaseTz",
      secondary: "secondaryPurchaseTz",
    },
    {
      label: "Purchases",
      value: "Purchases",
      primary: "primaryPurchaseCount",
      secondary: "secondaryPurchaseCount",
    },
  ];

  const primaryDataKey = optionsArray.find(
    (element) => element.value === chartUnit
  ).primary;
  const secondaryDataKey = optionsArray.find(
    (element) => element.value === chartUnit
  ).secondary;

  // Responsive formatting function for the y axis
  const valueFormatter = (value) => {
    if (chartUnit === "Usd") {
      return formatMillionDollarCurrency(value, 1);
    } else if (chartUnit === "Tz") {
      return formatMillionTezosCurrency(value, 1);
    } else {
      return formatMillionNumber(value, 2);
    }
  };

  return (
    <Stack
      sx={{ display: "flex", alignItems: "center" }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <RowRadioGroup
        optionsArray={optionsArray}
        callback={handleChartUnitChange}
        defaultValue="Usd"
      />
      <BarChart
        dataset={chartData}
        xAxis={[{ scaleType: "band", dataKey: "xLabel" }]}
        yAxis={[{ valueFormatter }]}
        series={[
          {
            dataKey: primaryDataKey,
            label: "Primary",
            stack: "purchases",
          },
          {
            dataKey: secondaryDataKey,
            label: "Secondary",
            stack: "purchases",
          },
        ]}
        height={height}
        margin={{ left: 70, top: 40 }} // margin around chart drawing area
        colors={["#4caf50", "#dc004e"]}
      />
    </Stack>
  );
};

export default MonthlyPurchasesChart;
