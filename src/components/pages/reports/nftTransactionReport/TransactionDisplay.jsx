// subcomponents
import UnpaginatedTable from "../../../composites/UnpaginatedTable";

import {
  formatTransactionType,
  formatDetailedDateTime,
  formatTezosCurrency,
  formatDollarCurrency,
  formatNumber,
  formatDateTime,
} from "../../../../utils/formatting";

import { useFilterContext } from "./NftTransactionReport";

const TransactionDisplay = () => {
  const { nft } = useFilterContext();

  const endPoint = nft ? `/transactions/nfts/${nft.id}` : "";

  const tableMaxHeight = 645; // height equivalent to filters and nft display

  const columnSpec = [
    {
      id: "transaction_type",
      title: "Transaction Type",
      align: "left",
      minWidth: 170,
      format: (value) => formatTransactionType(value),
    },
    {
      id: "timestamp",
      title: "Date/Time",
      align: "right",
      minWidth: 145,
      format: (value) => formatDetailedDateTime(value),
    },
    {
      id: "price_tz",
      title: "Price in Tz",
      minWidth: 120,
      align: "right",
      format: (value) => formatTezosCurrency(value, 1),
    },
    {
      id: "price_usd",
      title: "Price in Usd",
      minWidth: 120,
      align: "right",
      format: (value) => formatDollarCurrency(value, 2),
    },
    {
      id: "score",
      title: "Score",
      minWidth: 120,
      align: "right",
      format: (value) => formatNumber(value, 2),
    },
    {
      id: "normalised_score",
      title: "Norm Score",
      minWidth: 120,
      align: "right",
      format: (value) => formatNumber(value, 2),
    },
  ];

  return (
    nft && (
      <>
        <UnpaginatedTable
          endPoint={endPoint}
          columnSpec={columnSpec}
          tableMaxHeight={tableMaxHeight}
        />
      </>
    )
  );
};

export default TransactionDisplay;
