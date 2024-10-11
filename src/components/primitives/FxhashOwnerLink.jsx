import { CompositeLinkUnderline } from "../styledComponents/links";

const FxhashOwnerLink = ({ address, children }) => {
  const fxhashOwnerAddress = `https://www.fxhash.xyz/u/${address}/collection`;

  return (
    <CompositeLinkUnderline linkLoc={fxhashOwnerAddress}>
      {children}
    </CompositeLinkUnderline>
  );
};

export default FxhashOwnerLink;
