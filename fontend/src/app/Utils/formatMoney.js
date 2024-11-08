export const formatMoney = (number) => {
  if (!number) return "0₫";

  return (
    new Intl.NumberFormat("vi-VN", {
      currency: "VND",
    }).format(number) + "₫"
  );
};
