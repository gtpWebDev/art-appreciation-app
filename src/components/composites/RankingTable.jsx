// Material UI components
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/Table";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";

// styled components
import {
  StyledTableHeaderCell,
  StyledTableCell,
  StyledTableCellLeftAlign,
} from "../styledComponents/table";

// subcomponents
import FxhashOwnerLink from "../primitives/FxhashOwnerLink";

// utility
import { formatNumber, formatDollarCurrency } from "../../utils/formatting";
import { shortenAddress } from "../../utils/textFunctions";

/**
 *  Generate a table with top rows showing rank data,
 *  a space, then owner data
 */

const RankingTable = ({ rankData, ownerData, isArtSpend }) => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader size="small">
        <StatsTableHeader isArtSpend={isArtSpend} />
        <TableBody>
          <TopRanksSection data={rankData} isArtSpend={isArtSpend} />
          <GapRow />
          <OwnerRow data={ownerData} isArtSpend={isArtSpend} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StatsTableHeader = ({ isArtSpend }) => {
  // formatting to ensure consistent display across all screen widths
  const totSpendText = (
    <>
      Total
      <br />
      Spend
    </>
  );
  const conditionalSpendText = isArtSpend ? (
    <>
      Art
      <br />
      Spend
    </>
  ) : (
    <>
      Speculate
      <br />
      Spend
    </>
  );

  return (
    <TableHead>
      <TableRow>
        <StyledTableHeaderCell>{"Owner"} </StyledTableHeaderCell>
        <StyledTableHeaderCell>{"Rank"} </StyledTableHeaderCell>
        <StyledTableHeaderCell>{totSpendText} </StyledTableHeaderCell>
        <StyledTableHeaderCell>{conditionalSpendText} </StyledTableHeaderCell>
      </TableRow>
    </TableHead>
  );
};

const TopRanksSection = ({ data, isArtSpend }) => {
  return (
    <>
      {data.map(
        (
          row,
          index // using the index to generate the rank
        ) => (
          <TopRanksRow
            key={row.id}
            rowData={row}
            rank={index + 1}
            isArtSpend={isArtSpend}
          />
        )
      )}
    </>
  );
};

const TopRanksRow = ({ rowData, rank, isArtSpend }) => {
  const conditionalData = isArtSpend
    ? rowData.art_dollars
    : rowData.speculate_dollars;

  const totalSpend = formatDollarCurrency(rowData.total_purchase_value_usd, 0);
  const conditionalSpend = formatDollarCurrency(conditionalData, 0);

  return (
    <TableRow>
      <StyledTableCell
        text={
          <FxhashOwnerLink address={rowData.parent_address}>
            {shortenAddress(rowData.parent_address)}
          </FxhashOwnerLink>
        }
      />
      <StyledTableCell text={rank} />
      <StyledTableCell text={totalSpend} />
      <StyledTableCell text={conditionalSpend} />
    </TableRow>
  );
};

const GapRow = () => {
  return (
    <TableRow>
      <TableCell
        colSpan={4}
        sx={{ display: { xs: "table-cell", md: "none", lg: "table-cell" } }} // removed for md
      >
        <Typography
          align="center"
          variant="subtitle2"
          style={{ fontStyle: "italic", opacity: 0.6 }}
        >
          ---
        </Typography>
      </TableCell>
    </TableRow>
  );
};

const OwnerRow = ({ data, isArtSpend }) => {
  const conditionalRank = isArtSpend
    ? formatNumber(data.artRank)
    : formatNumber(data.speculateRank);

  const conditionalData = isArtSpend
    ? data.art_dollars
    : data.speculate_dollars;

  const totalSpend = formatDollarCurrency(data.total_purchase_value_usd, 0);
  const conditionalSpend = formatDollarCurrency(conditionalData, 0);

  return (
    <TableRow>
      <StyledTableCellLeftAlign text={"Account"} />
      <StyledTableCell text={conditionalRank} />
      <StyledTableCell text={totalSpend} />
      <StyledTableCell text={conditionalSpend} />
    </TableRow>
  );
};

export default RankingTable;
