export const toRupiah = (amount: number) => {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};
