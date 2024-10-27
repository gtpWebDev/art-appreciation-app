/**
 * Restructuring from form:
  [
    {
      "most_recent_purchase_year": 2021,
      "most_recent_purchase_month": 11,
      "total_score_usd": "628340.7646580000001805",
      "total_score_normalised": "44062.171609",
      "total_purchase_value_tz": "264653.5675489999999777",
      "total_purchase_value_usd": "1372622.140508",
      "purchase_count_primary": 88513,
      "purchase_count_secondary": 6338,
      "purchase_count_all": 94851,
      "art_dollars": "1000481.45258300000009025",
      "speculate_dollars": "372140.68792499999990975"
    },
    {
      "most_recent_purchase_year": 2021,
      "most_recent_purchase_month": 12,
      "total_score_usd": "3957167.49563299999522662",
      "total_score_normalised": "78100.383152",
      "total_purchase_value_tz": "1808439.29243400000031736",
      "total_purchase_value_usd": "8176885.61587",
      "purchase_count_primary": 193019,
      "purchase_count_secondary": 40494,
      "purchase_count_all": 233513,
      "art_dollars": "6067026.55575149999761331",
      "speculate_dollars": "2109859.06011850000238669"
    }   
  ]

  to form

  [
    {
      xLabel: "Nov-2021",
      totalScoreUsd: 3957167,
      artDollars: 6067026,
      speculateDollars: 2109859,
    }
  ]
 */

const restructureScoresData = (data) => {
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
