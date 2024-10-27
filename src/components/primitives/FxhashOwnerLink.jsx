import { CompositeLinkPrimaryUnderline } from "../styledComponents/links";

const FxhashOwnerLink = ({ address, children }) => {
  const fxhashOwnerAddress = `https://www.fxhash.xyz/u/${address}/collection`;

  return (
    <CompositeLinkPrimaryUnderline linkLoc={fxhashOwnerAddress}>
      {children}
    </CompositeLinkPrimaryUnderline>
  );
};

export default FxhashOwnerLink;
