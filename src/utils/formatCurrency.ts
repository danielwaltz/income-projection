const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default (cost: string | number) => {
  if (typeof cost === 'string') cost = parseFloat(cost);
  return cost === 0 || cost ? formatter.format(cost) : '';
};
