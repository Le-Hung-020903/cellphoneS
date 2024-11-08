const generateOrderCode = (method, orderId) => {
  const data = new Date();
  const year = data.getFullYear().toString().slice(-2); // Lấy hai chữ cố cuối cùng của năm
  const month = String(data.getMonth() + 1).padStart(2, "0");
  const day = String(data.getDate()).padStart(2, "0");
  const orderNumber = String(orderId).padStart(4, "0");
  return method === "Chuyển khoản ngân hàng qua mã QR"
    ? `ON${day}${month}${year}${orderNumber}`
    : `COD${day}${month}${year}${orderNumber}`;
};
module.exports = generateOrderCode;
