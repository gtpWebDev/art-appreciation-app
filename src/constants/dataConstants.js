// mimics an enum - prevents reassignment and modification
export const TRANSACTION_TYPES = Object.freeze({
  PRIMARY_PURCHASE: "primary_purchase",
  SECONDARY_PURCHASE: "secondary_purchase",
  LISTING: "listing",
  DELISTING: "delisting",
});

/**
 * Thresholds and owner categories used to closely control presentation of the
 * owner categeories throughout the report.
 * Owners can be assigned based on their art_dollars_perc from the aaiscore_by_owner
 * material view, where they are >= minEqual and < maxBelow
 */

export const MIN_THRESHOLD = 0;
export const MAX_THRESHOLD = 1;

const OWNER_THRESHOLDS = [
  MIN_THRESHOLD,
  0.1,
  0.4,
  0.6,
  0.9,
  0.999,
  MAX_THRESHOLD + 0.01, // final catebory check is less than max threshold
];

export const OWNER_CATEGORIES = Object.freeze([
  {
    minEqual: OWNER_THRESHOLDS[0],
    maxBelow: OWNER_THRESHOLDS[1],
    categoryName: "Pure Speculator",
    color: "#FF0000", // Red
  },
  {
    minEqual: OWNER_THRESHOLDS[1],
    maxBelow: OWNER_THRESHOLDS[2],
    categoryName: "Majority Speculator",
    color: "#FF8042", //Orange
  },
  {
    minEqual: OWNER_THRESHOLDS[2],
    maxBelow: OWNER_THRESHOLDS[3],
    categoryName: "Balanced",
    color: "#FFDD57", // Light Orange
  },
  {
    minEqual: OWNER_THRESHOLDS[3],
    maxBelow: OWNER_THRESHOLDS[4],
    categoryName: "Majority Collector",
    color: "#A4DE6C", // Light Green
  },
  {
    minEqual: OWNER_THRESHOLDS[4],
    maxBelow: OWNER_THRESHOLDS[5],
    categoryName: "Pure Collector",
    color: "#00C49F", // Green
  },
  {
    minEqual: OWNER_THRESHOLDS[5],
    maxBelow: OWNER_THRESHOLDS[6],
    categoryName: "Collector Only",
    color: "#0088FE", // Blue
  },
]);

// First Color: #0088FE (Blue)
// Second Color: #00C49F (Green)
// Third Color: #FFBB28 (Yellow)
// Fourth Color: #FF8042 (Orange)
// Fifth Color: #FF0000 (Red)
// Sixth Color: #A4DE6C (Light Green)
// Seventh Color: #D0ED57 (Light Yellow)
// Eighth Color: #FFDD57 (Light Orange)
