var express = require("express");
var router = express.Router();
const categories = require("../../controllers/api/v1/products/categories/categories.controller");
const permissions = require("../../middlewares/api/permission.middleware");
const authMiddleware = require("../../middlewares/api/auth.middleware");

router.get(
  "/v1/categories",

  categories.index
);

router.post(
  "/v1/categories",
  authMiddleware,
  permissions("categories.insert"),
  categories.add
);
router.patch(
  "/v1/categories/:id",
  authMiddleware,
  permissions("categories.update"),
  categories.update
);
router.delete(
  "/v1/categories/:id",
  authMiddleware,
  permissions("categories.delete"),
  categories.delete
);
router.get(
  "/v1/categories/:category_id/products/count",
  categories.countProduct
);
module.exports = router;
