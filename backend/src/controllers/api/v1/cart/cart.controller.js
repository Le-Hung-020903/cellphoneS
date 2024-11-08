const {
  Cart,
  Cart_product,
  Product,
  Products_image,
} = require("../../../../models/index");
const {
  successResponse,
  errorResponse,
} = require("../../../../utils/response");
module.exports = {
  index: async (req, res) => {
    try {
      const user = req.user;
      const id = user?.id;
      if (!id) {
        return errorResponse(res, 401, "Unauthorized");
      }

      const cart = await Cart.findOne({
        where: {
          user_id: id,
        },
        attributes: ["id", "user_id"],
        include: {
          model: Cart_product,
          as: "cart_products",
          attributes: ["id", "product_id", "quantity", "unit_price"],
        },
      });

      const productId = cart?.dataValues?.cart_products.map(
        (item) => item.product_id
      );

      const productInstances = await Promise.all(
        productId.map(async (item) => {
          const productInstance = await Product.findAll({
            where: {
              id: item,
            },
            include: {
              model: Products_image,
              as: "Products_images",
              attributes: ["id", "url_image"],
            },
            attributes: ["id", "name"],
          });
          return productInstance;
        })
      );

      const productsMap = productInstances.flat().reduce((acc, product) => {
        if (product) {
          // Kiểm tra sản phẩm có tồn tại
          acc[product.id] = product;
        }
        return acc;
      }, {});

      const cartWithProducts = {
        id: cart.id,
        user_id: cart.user_id,
        cart_products: cart.cart_products.map((item) => ({
          ...item.dataValues,
          product: productsMap[item.product_id],
        })),
      };

      return successResponse(res, 200, "Success", {
        products: cartWithProducts,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  add: async (req, res) => {
    try {
      const { product_id, quantity } = req.body;
      const user = req.user;
      const id = user?.id;

      if (!product_id || !id) {
        return errorResponse(res, 400, "Product_id or user id is required");
      }

      if (
        typeof quantity !== "number" ||
        !Number.isInteger(quantity) ||
        quantity <= 0
      ) {
        return errorResponse(res, 400, "Quantity must be a positive integer");
      }
      if (
        typeof product_id !== "number" ||
        !Number.isInteger(product_id) ||
        product_id <= 0
      ) {
        return errorResponse(res, 400, "Product id must be a positive integer");
      }

      const [cart] = await Cart.findOrCreate({
        where: {
          user_id: id,
        },
        defaults: {
          user_id: id,
        },
      });
      if (!cart) {
        return errorResponse(res, 500, "Server error");
      }

      const product = await Product.findByPk(product_id);
      const productPrice = product?.price;

      const [cartProduct, created] = await Cart_product.findOrCreate({
        where: {
          cart_id: cart.id,
          product_id: product_id,
        },
        defaults: {
          cart_id: cart.id,
          product_id: product_id,
          quantity: quantity,
          unit_price: productPrice,
        },
      });
      if (!created && cartProduct.quantity < 3) {
        cartProduct.quantity += quantity;
        await cartProduct.save();
      } else {
        return errorResponse(
          res,
          400,
          "Số lượng sản phẩm không được vượt quá 3"
        );
      }
      if (!cartProduct) {
        return errorResponse(res, 500, "Server errors");
      }

      return successResponse(res, 200, "Success", {
        cartProduct,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server error", e.message);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await Cart_product.findByPk(id);
      if (!cart) {
        return errorResponse(res, 404, "Cart product not found");
      }
      await cart.destroy();
      return successResponse(res, 200, "Delete successfully");
    } catch (e) {
      return errorResponse(res, 500, "Server error", e.message);
    }
  },
};
