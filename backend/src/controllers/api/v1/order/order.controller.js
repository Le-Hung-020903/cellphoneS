const {
  Order_detail,
  Order,
  Payment,
  Products_image,
  sequelize,
} = require("../../../../models/index");
const {
  successResponse,
  errorResponse,
} = require("../../../../utils/response");
const orderSchema = require("../../../../validators/order.validators");
const generateOrderCode = require("../../../../utils/generateOrderCode");
module.exports = {
  getAllOrder: async (req, res) => {
    try {
      const { id } = req.user;
      if (!id) {
        return errorResponse(res, 401, "Unauthorized");
      }
      const orders = await Order.findAll({
        where: { user_id: id },
        attributes: [
          "id",
          "order_status",
          "total_price",
          "notes",
          "payment_method",
          "shipping_address",
          "recipient_phone",
          "recipient_name",
          "shipping_fee",
          "order_code",
          "created_at",
        ],
        order: [["created_at", "DESC"]],
      });
      const data = await Promise.all(
        orders.map(async (order) => {
          const orderDetails = await Order_detail.findAll({
            where: { order_id: order.id },
            attributes: [
              "id",
              "product_id",
              "product_name",
              "price",
              "order_id",
            ],
            order: [["id", "DESC"]],
          });
          const firstDetail = orderDetails[0];
          const productImage = await Products_image.findOne({
            where: { product_id: firstDetail.product_id },
            attributes: ["id", "url_image", "product_id"],
          });
          const additionalCount = orderDetails.length - 1;
          return {
            order_id: order.id,
            order_status: order.order_status,
            created_at: order.created_at,
            payment_method: order.payment_method,
            recipient_name: order.recipient_name,
            order_detail: {
              product_id: firstDetail.product_name,
              price: firstDetail.price,
              product_name: firstDetail.product_name,
              url_image: productImage ? productImage.url_image : null,
              additional_products:
                additionalCount > 0
                  ? `và ${additionalCount} sản phẩm khác`
                  : null,
            },
          };
        })
      );
      return successResponse(res, 200, "Success", data);
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  getLatestOrder: async (req, res) => {
    try {
      const { id } = req.user;
      if (!id) {
        return errorResponse(res, 401, "Unauthorized");
      }
      const orderId = await Order.findOne({
        where: { user_id: id },
        attributes: ["id"],
        order: [["created_at", "DESC"]],
      });
      if (!orderId) {
        return successResponse(res, 404, "No order found");
      }

      const latestOrder = await Order.findOne({
        where: { id: orderId.id },
        include: [
          {
            model: Order_detail,
            as: "order_details", // Alias đã thiết lập trong quan hệ
            attributes: [
              "id",
              "price",
              "quantity",
              "product_id",
              "product_name",
            ],
          },
        ],
        attributes: [
          "id",
          "payment_method",
          "total_price",
          "shipping_address",
          "recipient_name",
          "recipient_phone",
          "recipient_email",
          "order_code",
          "notes",
        ],
      });

      const productIds = latestOrder?.order_details?.map((item) => {
        return item.product_id;
      });

      const productImages = await Promise.all(
        productIds.map(async (item) => {
          const productInstance = await Products_image.findOne({
            where: { product_id: item },
            attributes: ["id", "url_image", "product_id"],
          });
          return productInstance;
        })
      );

      const data = {
        id: latestOrder.id,
        payment_method: latestOrder.payment_method,
        total_price: latestOrder.total_price,
        shipping_address: latestOrder.shipping_address,
        recipient_name: latestOrder.recipient_name,
        recipient_phone: latestOrder.recipient_phone,
        recipient_email: latestOrder.recipient_email,
        order_code: latestOrder.order_code,
        notes: latestOrder.notes,
        order_details: latestOrder.order_details.map((item) => {
          const productImgs = productImages.find(
            (productImg) => productImg.product_id === item.product_id
          );
          return {
            id: item.id,
            product_id: item.product_id,
            product_name: item.product_name,
            price: item.price,
            quantity: item.quantity,
            url_image: productImgs?.url_image,
          };
        }),
      };

      return successResponse(res, 200, "Success", data);
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  getDetailOrder: async (req, res) => {
    try {
      const { id } = req.user;
      const { id: orderId } = req.params;
      if (!id) {
        return errorResponse(res, 401, "Unauthorized");
      }
      if (!orderId) {
        return errorResponse(res, 400, "Missing order ID");
      }
      const order = await Order.findOne({
        where: { id: orderId, user_id: id },
        attributes: [
          "id",
          "total_price",
          "shipping_address",
          "recipient_name",
          "recipient_phone",
          "order_code",
          "order_status",
          "shipping_fee",
          "order_code",
          "created_at",
        ],
      });
      if (!order) {
        return successResponse(res, 404, "Order not found");
      }
      const detailOrders = await Order_detail.findAll({
        where: { order_id: order.id },
      });

      const productImages = await Promise.all(
        detailOrders.map(async (detailOrder) => {
          const productImage = await Products_image.findOne({
            where: { product_id: detailOrder.product_id },
          });
          return {
            detail_order_id: detailOrder.id,
            product_name: detailOrder.product_name,
            product_id: detailOrder.product_id,
            quantity: detailOrder.quantity,
            url_image: productImage.url_image ? productImage.url_image : null,
          };
        })
      );
      const data = {
        order_id: order.id,
        order_code: order.order_code,
        order_status: order.order_status,
        created_at: order.created_at,
        total_price: order.total_price,
        recipient_name: order.recipient_name,
        recipient_phone: order.recipient_phone,
        shipping_fee: order.shipping_fee,
        shipping_address: order.shipping_address,
        detail_order: productImages,
      };
      return successResponse(res, 200, "Success", data);
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  add: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const body = await orderSchema.validate(req.body, {
        abortEarly: false,
      });
      const { id } = req.user;

      // Tạo đơn hàng
      const order = await Order.create(
        {
          user_id: id,
          order_status: "pending",
          total_price: 0,
          notes: body.notes ?? "",
          shipping_address: body.shipping_address ?? "",
          recipient_name: body.recipient_name ?? "",
          recipient_phone: body.recipient_phone ?? "",
          recipient_email: body.recipient_email ?? "",
          shipping_fee: body.shipping_fee ?? 0,
          payment_method: body.payment_method ?? "",
        },
        { transaction }
      );
      if (!order) {
        await transaction.rollback();
        return errorResponse(res, 500, "Unable to create order");
      }

      // Tạo chi tiết đơn hàng
      if (!body.cartList) {
        body.cartList = [];
      }
      body.cartList = Array.isArray(body.cartList)
        ? body.cartList
        : [body.cartList];

      const orderId = order.id;
      let totalMoney = 0;
      await Promise.all(
        body.cartList.map(async (cartItem) => {
          const cartItemInstance = await Order_detail.create(
            {
              order_id: orderId,
              quantity: cartItem.quantity,
              price: cartItem.price,
              discount_amount: cartItem.discountAmount ?? 0,
              product_id: cartItem.productId,
              product_name: cartItem.productName,
            },
            { transaction }
          );
          if (!cartItemInstance) {
            throw new Error("Unable to create order detail");
          }
          totalMoney += cartItem.price * cartItem.quantity;
        })
      );

      // cập nhật tiền và mã cho order
      const orderCode = generateOrderCode(body.payment_method, orderId);
      await Order.update(
        { total_price: totalMoney, order_code: orderCode },
        { where: { id: orderId }, transaction }
      );

      // Tạo phương thức thanh toán
      if (body.payment_method === "Thanh toán khi nhận hàng") {
        const paymentMethod = await Payment.create(
          {
            order_id: orderId,
            payment_method: body.payment_method,
            payment_status: "pending",
            qr_code_url: null,
            qr_code_data: null,
            transaction_id: null,
            payment_time: null,
            payment_gateway_response: null,
            cod_confirmed: false,
          },
          { transaction }
        );
        if (!paymentMethod) {
          await transaction.rollback();
          return errorResponse(res, 500, "Unable to create payment method");
        }
      }

      // nếu tất cả các transaction thành công sẽ commit để lưu lại
      await transaction.commit();

      return successResponse(res, 200, "Order created successfully", order);
    } catch (e) {
      if (e.name === "ValidationError") {
        const errors = Object.fromEntries(
          e?.inner?.map(({ path, message }) => {
            return [path, message];
          })
        );
        return errorResponse(res, 400, "Validation Error", errors);
      }
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  countOrder: async (req, res) => {
    try {
      const { id } = req.user;
      if (!id) {
        return errorResponse(res, 401, "Unauthorized");
      }
      const { count } = await Order.findAndCountAll({
        where: { user_id: id },
      });
      return successResponse(res, 200, "Success", { quantity: count });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  getAllOrdersAdmin: async (req, res) => {
    try {
      const { status, page } = req.query;
      const { id } = req.user;
      if (!id) {
        return errorResponse(res, 401, "Unauthorized");
      }
      let filter = {};
      if (status) {
        filter.order_status = status;
      }
      const orders = await Order.findAll({
        where: filter,
        attributes: [
          "id",
          "order_status",
          "total_price",
          "notes",
          "payment_method",
          "shipping_address",
          "recipient_phone",
          "recipient_name",
          "shipping_fee",
          "order_code",
          "created_at",
        ],
        order: [["created_at", "DESC"]],
      });
      const data = await Promise.all(
        orders.map(async (order) => {
          const orderDetails = await Order_detail.findAll({
            where: { order_id: order.id },
            attributes: [
              "id",
              "product_id",
              "product_name",
              "price",
              "order_id",
            ],
            order: [["id", "DESC"]],
          });
          const firstDetail = orderDetails[0];
          const productImage = await Products_image.findOne({
            where: { product_id: firstDetail.product_id },
            attributes: ["id", "url_image", "product_id"],
          });
          const additionalCount = orderDetails.length - 1;
          return {
            order_id: order.id,
            order_status: order.order_status,
            created_at: order.created_at,
            payment_method: order.payment_method,
            recipient_name: order.recipient_name,
            order_detail: {
              product_id: firstDetail.product_name,
              price: firstDetail.price,
              product_name: firstDetail.product_name,
              url_image: productImage ? productImage.url_image : null,
              additional_products:
                additionalCount > 0
                  ? `và ${additionalCount} sản phẩm khác`
                  : null,
            },
          };
        })
      );
      return successResponse(res, 200, "Success", data);
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  getDetailOrderAdmin: async (req, res) => {
    try {
      const { id } = req.user;
      const { id: orderId } = req.params;
      if (!id) {
        return errorResponse(res, 401, "Unauthorized");
      }
      if (!orderId) {
        return errorResponse(res, 400, "Missing order ID");
      }
      const order = await Order.findOne({
        where: { id: orderId },
        attributes: [
          "id",
          "total_price",
          "shipping_address",
          "recipient_name",
          "recipient_phone",
          "recipient_email",
          "order_code",
          "payment_method",
          "order_status",
          "shipping_fee",
          "order_code",
          "created_at",
        ],
      });
      if (!order) {
        return successResponse(res, 404, "Order not found");
      }
      const detailOrders = await Order_detail.findAll({
        where: { order_id: order.id },
      });

      const productImages = await Promise.all(
        detailOrders.map(async (detailOrder) => {
          const productImage = await Products_image.findOne({
            where: { product_id: detailOrder.product_id },
          });
          return {
            detail_order_id: detailOrder.id,
            product_name: detailOrder.product_name,
            product_id: detailOrder.product_id,
            quantity: detailOrder.quantity,
            price: detailOrder.price,
            url_image: productImage.url_image ? productImage.url_image : null,
          };
        })
      );
      const data = {
        order_id: order.id,
        order_code: order.order_code,
        order_status: order.order_status,
        created_at: order.created_at,
        total_price: order.total_price,
        payment_method: order.payment_method,
        recipient_name: order.recipient_name,
        recipient_phone: order.recipient_phone,
        recipient_email: order.recipient_email,
        shipping_fee: order.shipping_fee,
        shipping_address: order.shipping_address,
        detail_order: productImages,
      };
      return successResponse(res, 200, "Success", data);
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
};
