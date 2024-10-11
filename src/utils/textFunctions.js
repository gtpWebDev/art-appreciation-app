export const shortenAddress = (str) => {
  return str.slice(0, 3) + "..." + str.slice(-4);
};
