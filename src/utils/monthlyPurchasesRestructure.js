const restructureData = (data) => {
  // Start Month/Year is Nov-21 - first month of fxhash
  const startMonth = 11;
  const startYear = 2021;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11
  const currentYear = currentDate.getFullYear();

  // Create a list for all month-year combinations from start to current
  const allMonthYears = [];
  let year = startYear;
  let month = startMonth - 1; // Adjust for 0-indexed month

  while (
    year < currentYear ||
    (year === currentYear && month <= currentMonth)
  ) {
    allMonthYears.push(`${months[month]}-${year}`);

    // Move to the next month
    month++;
    if (month > 11) {
      // Reset month to 0 (Jan) and increment the year
      month = 0;
      year++;
    }
  }

  // Reduce the data to accumulate values by month and year
  const transformed = data.reduce((acc, curr) => {
    const monthYear = `${months[curr.transaction_month - 1]}-${
      curr.transaction_year
    }`;

    let record = acc.find((item) => item.xLabel === monthYear);
    if (!record) {
      record = {
        xLabel: monthYear,
        primaryPurchaseCount: 0,
        primaryPurchaseTz: 0,
        primaryPurchaseUsd: 0,
        secondaryPurchaseCount: 0,
        secondaryPurchaseTz: 0,
        secondaryPurchaseUsd: 0,
      };
      acc.push(record);
    }

    if (curr.transaction_type === "primary_purchase") {
      record.primaryPurchaseCount += curr.count;
      record.primaryPurchaseTz += parseFloat(curr.sum_price_tz);
      record.primaryPurchaseUsd += parseFloat(curr.sum_price_usd);
    } else if (curr.transaction_type === "secondary_purchase") {
      record.secondaryPurchaseCount += curr.count;
      record.secondaryPurchaseTz += parseFloat(curr.sum_price_tz);
      record.secondaryPurchaseUsd += parseFloat(curr.sum_price_usd);
    }

    return acc;
  }, []);

  // Ensure all months in the specified range are present with zeroed-out data if missing
  allMonthYears.forEach((monthYear) => {
    if (!transformed.find((item) => item.xLabel === monthYear)) {
      transformed.push({
        xLabel: monthYear,
        primaryPurchaseCount: 0,
        primaryPurchaseTz: 0,
        primaryPurchaseUsd: 0,
        secondaryPurchaseCount: 0,
        secondaryPurchaseTz: 0,
        secondaryPurchaseUsd: 0,
      });
    }
  });

  // Sorting the result by month and year
  transformed.sort((a, b) => {
    const [monthA, yearA] = a.xLabel.split("-");
    const [monthB, yearB] = b.xLabel.split("-");

    const monthIndexA = months.indexOf(monthA);
    const monthIndexB = months.indexOf(monthB);

    if (yearA !== yearB) {
      return parseInt(yearA) - parseInt(yearB);
    }

    return monthIndexA - monthIndexB;
  });

  return transformed;
};

export default restructureData;
