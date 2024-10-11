/**
 * Functions to better present the backend data.
 */

import { TRANSACTION_TYPES } from "../constants/dataConstants";
import { format, parseISO } from "date-fns";

const tidyTransactionType = (type) => {
  switch (type) {
    case "primary_purchase":
      return "Primary Purchase";
    case "secondary_purchase":
      return "Secondary Purchase";
    case "listing":
      return "Listing";
    case "delisting":
      return "Cancel Listing";
  }
};

/**
 * @typedef {Object} FormattedTransaction
 * @property {string} transType - Tidy version of transaction type
 * @property {string} priceTz - Text form of price in tz
 * @property {string} priceUsd - Text form of price in Usd
 */

/**
 * tidyPriceTz function - tidies text from backend request
 * @param {Object} trans - transaction object as received from backend
 * @returns {FormattedTransaction} - Object containing transaction formatted elements
 */
export const formatTransaction = (trans) => {
  const isPurchase =
    trans.transaction_type === TRANSACTION_TYPES.PRIMARY_PURCHASE ||
    trans.transaction_type === TRANSACTION_TYPES.SECONDARY_PURCHASE;

  const priceTz = isPurchase ? Number(trans.price_tz).toFixed(1) + "tz" : "";
  const priceUsd = isPurchase ? "$" + Number(trans.price_usd).toFixed(2) : "";

  const transType = tidyTransactionType(trans.transaction_type);

  // const date = parseISO(trans.timestamp);
  const transDateTime = format(
    parseISO(trans.timestamp),
    "dd-MMM-yyyy, HH:mm:ss"
  );

  const shortTransDateTime = format(parseISO(trans.timestamp), "dd-MMM-yy");

  const score = Number(trans.score).toFixed(1);
  const normalisedScore = Number(trans.normalised_score).toFixed(3);

  return {
    priceTz,
    priceUsd,
    transType,
    transDateTime,
    shortTransDateTime,
    score,
    normalisedScore,
  };
};

// number -> $1,234
export const formatDollarCurrency = (value, decimalPoints) => {
  const num = Number(value);
  const formattedValue = Math.abs(num).toLocaleString("en-US", {
    minimumFractionDigits: decimalPoints,
    maximumFractionDigits: decimalPoints,
  });

  return num < 0 ? `-$${formattedValue}` : `$${formattedValue}`;
};

// number -> 1,234 tz
export const formatTezosCurrency = (value, decimalPoints) => {
  const num = Number(value);
  return `${num.toLocaleString("en-US", {
    minimumFractionDigits: decimalPoints,
    maximumFractionDigits: decimalPoints,
  })} tz`;
};

// number -> 1,234
export const formatNumber = (value, decimalPoints) => {
  const num = Number(value);
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimalPoints,
    maximumFractionDigits: decimalPoints,
  });
};

export const formatDateTime = (timestamp) => {
  return format(parseISO(timestamp), "dd-MMM-yy");
};

export const formatDetailedDateTime = (timestamp) => {
  return format(parseISO(timestamp), "dd-MMM-yy, HH:mm");
};

export const formatTransactionType = (transType) => {
  switch (transType) {
    case "primary_purchase":
      return "Primary Purchase";
    case "secondary_purchase":
      return "Secondary Purchase";
    case "listing":
      return "Listing";
    case "delisting":
      return "Cancel Listing";
    default:
      return "";
  }
};
