export const shortenAddress = (address) => {
  if (address.length > 9)
    return address.slice(0, 5) + "..." + address.slice(-4);
  else return address;
};
