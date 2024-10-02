export const shortenAddress = (str) => {
  return str.slice(0, 2) + "..." + str.slice(-5);
};
