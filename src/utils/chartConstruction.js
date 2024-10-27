import {
  MIN_THRESHOLD,
  MAX_THRESHOLD,
  OWNER_CATEGORIES,
} from "../constants/dataConstants";

/**
 * Collects category information (category name, chart color) for owners based on input value
 * @param {number} value - Art dollar percentage
 * @returns {string|null} - The colour string e.g. "#0088fe" of the owner category or null if invalid input.
 * @throws {Error} - No current error criteria
 */

export const getOwnerCategoryInfo = (input) => {
  const numInput = Number(input);

  if (isNaN(numInput)) {
    const text = "Input must be a number";
    console.log(text);
    return null;
  }

  if (numInput < MIN_THRESHOLD || numInput > MAX_THRESHOLD) {
    const text = `Input value (art dollar percentage) must be strictly between ${MIN_THRESHOLD} and ${MAX_THRESHOLD}`;
    console.log(text);
    return null;
  }

  const categoryInfo = OWNER_CATEGORIES.find(
    (element) => numInput >= element.minEqual && numInput < element.maxBelow
  );

  return categoryInfo;
};

/**
 * Aggregates chart bucket data for categories and all owners - num_owners, total spend, art spend, speculate spend, average spend
 * @param {array} data
 * @returns {array}
 */
export const summariseOwnerSpend = (bucketData) => {
  /**
   * requires chart data of form:
    [{
      "bucket": 10,
      "num_owners": 100,
      "bucket_average": 1,
      "total_spend_usd": 8200,
      "total_art_dollars": 5000,
      "total_speculate_dollars": 3200
    }]

    Generates output arrays:
    - allOwnersSummary,
    - spendCategorySummary
 */

  // initialise summaries
  const spendCategorySummary = OWNER_CATEGORIES.map((element) => ({
    category: element.categoryName,
    num_owners: 0,
    total_spend_usd: 0,
    art_dollars: 0,
    speculate_dollars: 0,
  }));
  const allOwnersSummary = {
    num_owners: 0,
    total_spend_usd: 0,
    art_dollars: 0,
    speculate_dollars: 0,
  };

  // add each data point to spend category and total summaries
  bucketData.forEach((data) => {
    // add to all owner summary
    allOwnersSummary.num_owners += data.num_owners;
    allOwnersSummary.total_spend_usd += data.total_spend_usd;
    allOwnersSummary.art_dollars += data.total_art_dollars;
    allOwnersSummary.speculate_dollars += data.total_speculate_dollars;

    // add to category summary
    const categoryInfo = getOwnerCategoryInfo(data.bucket_average);

    let summaryCategory = spendCategorySummary.find(
      (sumEle) => sumEle.category === categoryInfo.categoryName
    );
    summaryCategory.num_owners += data.num_owners;
    summaryCategory.total_spend_usd += data.total_spend_usd;
    summaryCategory.art_dollars += data.total_art_dollars;
    summaryCategory.speculate_dollars += data.total_speculate_dollars;
  });

  return { allOwnersSummary, spendCategorySummary };
};
