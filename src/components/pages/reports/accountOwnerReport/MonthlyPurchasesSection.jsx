import { useEffect, useState } from "react";

// Material UI components
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";

// subcomponents
import LoadingCircle from "../../../composites/LoadingCircle";
import RowRadioGroup from "../../../composites/RadioGroup";

// context
import { useAccountOwner } from "./AccountOwnerContext";

// hooks
import useGetBackendData from "../../../../hooks/useGetBackendData";

// utility
import {
  formatDollarCurrency,
  formatTezosCurrency,
  formatNumber,
} from "../../../../utils/formatting";

import restructureData from "../../../../utils/monthlyPurchasesRestructure";

const MonthlyPurchasesSection = () => {
  return (
    <Grid container p={2} columnSpacing={2}>
      <Grid size={12}>{/* <SectionHeader /> */}</Grid>
      <SectionContent />
    </Grid>
  );
};

const SectionContent = () => {
  // collect account details from context
  const { accountOwner } = useAccountOwner();

  // hook for collecting monthly purchase data
  const { loading, error, data } = useGetBackendData(
    `http://localhost:3000/purchases/by-month/owners/${accountOwner.id}`
  );

  return (
    <>
      {loading ? (
        <FormattedLoadingCircle />
      ) : (
        <Grid size={12} sx={{ pt: { xs: 0, md: 1 } }}>
          <MonthlyPurchasesChart data={data} />
        </Grid>
      )}
    </>
  );
};

const MonthlyPurchasesChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // restructure backend data into required form
    const restructuredData = restructureData(data);
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
      return formatDollarCurrency(value);
    } else if (chartUnit === "Tz") {
      return formatTezosCurrency(value);
    } else {
      return formatNumber(value);
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
        // width={500}
        height={250}
        margin={{ left: 70, top: 40 }} // margin around chart drawing area
        colors={["#4caf50", "#dc004e"]}
      />
    </Stack>
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

export default MonthlyPurchasesSection;
