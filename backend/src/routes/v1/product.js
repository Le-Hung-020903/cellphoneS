var express = require("express");
var router = express.Router();
const productController = require("../../controllers/api/v1/products/product/product.controller");
const authMiddleware = require("../../middlewares/api/auth.middleware");
const permission = require("../../middlewares/api/permission.middleware");

router.get("/v1/products", productController.index);
router.post(
  "/v1/products",
  authMiddleware,
  permission("products.insert"),
  productController.add
);
router.patch(
  "/v1/products/:id",
  authMiddleware,
  permission("products.update"),
  productController.update
);
router.get("/v1/products/:id", productController.find);
router.delete(
  "/v1/products/:id",
  authMiddleware,
  permission("products.delete"),
  productController.delete
);
router.delete(
  "/v1/products/:product_id/images/:image_id",
  productController.deleteUrl
);
router.get(
  "/v1/products/device/manufacturers/category/:category",
  productController.filterProductByCategory
);
router.get(
  "/v1/products/device/:device",
  productController.filterProductByDevice
);
router.get(
  "/v1/products/manufacturers/:manufacturer",
  productController.filterProductByManufacturer
);
router.get(
  "/v1/products/similar/:similar",
  productController.filterSimilarProduct
);
router.get("/v1/products/home/getProductHome", productController.homeProduct);
router.post(
  "/v1/favoriteProduct",
  authMiddleware,
  productController.addFavoriteProduct
);
router.get(
  "/v1/favoriteProduct",
  authMiddleware,
  productController.getFavoriteProducts
);
router.delete(
  "/v1/favoriteProduct/:id",
  authMiddleware,
  productController.deleteFavoriteProduct
);

module.exports = router;
