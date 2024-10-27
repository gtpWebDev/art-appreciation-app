import { useContext } from "react";

// subcomponents
import PaginatedTable from "../../../composites/PaginatedTable";
import NftImageDisplay from "../../../composites/NftImageDisplay";

// context
import { AccountOwnerContext } from "./AccountOwnerReport";

// utils
import {
  formatDetailedDateTime,
  formatTransactionType,
  formatDollarCurrency,
  formatTezosCurrency,
} from "../../../../utils/formatting";

import { ipfsLink } from "../../../../utils/fxhashAddresses";

// subcomponents

/**
 * Top component collects owner id and controls props for paginated table
 */

const AccountTransactionsSection = () => {
  // collect account details from context
  const { accountOwner } = useContext(AccountOwnerContext);

  // Control variables for generalised paginated table
  const rootEndPoint = `http://localhost:3000/transactions/owners/${accountOwner.id}`;
  const countEndPoint = `${rootEndPoint}/count`;
  const columns = [
    {
      id: "timestamp",
      title: "Date/Time",
      minWidth: 145,
      format: (value) => formatDetailedDateTime(value),
    },
    {
      id: "thumbnail",
      title: "Nft\u00a0Id",
      minWidth: 100,
      align: "center",
      format: (value) => (
        <NftImageDisplay imgAddress={ipfsLink(value)} size={60} />
      ),
    },
    {
      id: "transaction_type",
      title: "Transaction\u00a0Type",
      minWidth: 170,
      format: (value) => formatTransactionType(value),
    },
    {
      id: "price_usd",
      title: "Price in Usd",
      minWidth: 120,
      align: "right",
      format: (value) => (value === 0 ? "" : formatDollarCurrency(value, 2)),
    },
    {
      id: "price_tz",
      title: "Price in Tz",
      minWidth: 120,
      align: "right",
      format: (value) => formatTezosCurrency(value, 1),
    },
  ];

  return (
    <PaginatedTable
      rootEndPoint={rootEndPoint}
      countEndPoint={countEndPoint}
      columns={columns}
    />
  );
};

export default AccountTransactionsSection;
