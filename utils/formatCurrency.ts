export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "ZAR",
  }).format(amount);
};
