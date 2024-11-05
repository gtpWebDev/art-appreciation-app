import { LEFT_COLUMN_WIDTH } from "./NftTransactionReport";

import { useFilterContext } from "./NftTransactionReport";

// material UI
import Typography from "@mui/material/Typography";

import { formatMonthText } from "../../../../utils/formatting";

// subcomponents
import NftDisplay from "../../../composites/NftDisplay";

export const NftDisplayArea = () => {
  /**
   * Displays the NFT image, and related information, only when filters have
   * been chosen to NFT level - id or iteration
   */

  const { nft, filterInfoComplete } = useFilterContext();

  return (
    filterInfoComplete && (
      <NftDisplay
        containerWidth={LEFT_COLUMN_WIDTH}
        imageWidth={LEFT_COLUMN_WIDTH}
        nftId={nft.id}
      >
        <Typography>
          Created in {formatMonthText(nft.mint_month)}, {nft.mint_year}
        </Typography>
      </NftDisplay>
    )
  );
};

export default NftDisplayArea;
