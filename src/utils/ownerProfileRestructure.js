/**
 * Restructuring from form:
  [
    {
      id: 5322,
      parent_address: "tz1Zs3MT7Y5JNjV4Ed5bfoVoXp4yNBSdVGGT",
      art_dollars: "735635.6653545000005195",
      purchase_count_all: 1116,
      purchase_count_primary: 157,
      purchase_count_secondary: 959,
      speculate_dollars: "974.0832634999994805",
      total_purchase_value_tz: "194762.642996000000113",
      total_purchase_value_usd: "736609.748618",
      total_score_normalised: "1100.69589",
      total_score_usd: "734661.582091000001039"
    },
    ...
  ]

  to form

  [
    {
      name: art_dollars,
      metric: 6067026,
    }
  ]
 */

// NOT YET USED!!!! MAY BE PROVIDING DATA IN CORRECT FORM FROM BACKEND

const restructureScoresData = (data, rankfield) => {
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
  // ["Nov-2021","Dec-2021", etc.]
  const allMonthYears = [];
  let year = startYear;
  let month = startMonth - 1; // Adjust for 0-indexed month

  while (
    year < currentYear ||
    (year === currentYear && month <= currentMonth)
  ) {
    allMonthYears.push(`${months[month]}-${year}`);

    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
  }

  // Use reduce to run through data array; create a new array element if necessary, then add the data
  const transformed = data.reduce((acc, curr) => {
    // generate e.g. "12-2022"
    const monthYear = `${months[curr.most_recent_purchase_month - 1]}-${
      curr.most_recent_purchase_year
    }`;

    // wherever monthyear not seen before, initialise an array element
    let record = acc.find((item) => item.name === monthYear);
    if (!record) {
      record = {
        name: monthYear,
        totalScoreUsd: 0,
        artDollars: 0,
        speculateDollars: 0,
      };
      acc.push(record);
    }

    // if didn't need to init
    record.totalScoreUsd += parseFloat(curr.total_score_usd);
    record.artDollars += parseFloat(curr.art_dollars);
    record.speculateDollars += -parseFloat(curr.speculate_dollars);

    return acc;
  }, []);

  // Fill any gaps in the data
  allMonthYears.forEach((monthYear) => {
    if (!transformed.find((item) => item.name === monthYear)) {
      transformed.push({
        name: monthYear,
        totalScoreUsd: 0,
        artDollars: 0,
        speculateDollars: 0,
      });
    }
  });

  // Sort by month and year
  transformed.sort((a, b) => {
    const [monthA, yearA] = a.name.split("-");
    const [monthB, yearB] = b.name.split("-");

    const monthIndexA = months.indexOf(monthA);
    const monthIndexB = months.indexOf(monthB);

    if (yearA !== yearB) {
      return parseInt(yearA) - parseInt(yearB);
    }

    return monthIndexA - monthIndexB;
  });

  return transformed;
};

export default restructureScoresData;
