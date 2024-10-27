// receives artist address
export const fxArtistLink = (artistAddress) =>
  `https://www.fxhash.xyz/u/${artistAddress}`;

// receives fxhash collection id
export const fxCollectionLink = (fxhashCollectionId) =>
  `https://www.fxhash.xyz/generative/${fxhashCollectionId}`;

// receives thumbnail ipfs detail in form:
// "ipfs://QmUKTwnQoLV1SvoQPXry68ktiSfkFu89wVxryhaeSPaUz2"
export const ipfsLink = (ipfsThumbnail) => {
  const removedIpfs = ipfsThumbnail.replace("ipfs://", "");
  console.log(`https://gateway.fxhash2.xyz/ipfs/${removedIpfs}`);
  return `https://gateway.fxhash2.xyz/ipfs/${removedIpfs}`;
};
