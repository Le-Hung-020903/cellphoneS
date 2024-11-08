var express = require("express");
var router = express.Router();
const discountCodeController = require("../../controllers/api/v1/products/discountCode/discountCode.controller");
const authMiddleware = require("../../middlewares/api/auth.middleware");
const permissionMiddleware = require("../../middlewares/api/permission.middleware");

router.get(
  "/v1/discounts",
  authMiddleware,
  permissionMiddleware("discounts.read"),
  discountCodeController.index
);
router.post(
  "/v1/discounts",
  authMiddleware,
  permissionMiddleware("discounts.insert"),
  discountCodeController.add
);
router.patch(
  "/v1/discounts/:id",
  authMiddleware,
  permissionMiddleware("discounts.update"),
  discountCodeController.update
);
router.delete(
  "/v1/discounts/:id",
  authMiddleware,
  permissionMiddleware("discounts.delete"),
  discountCodeController.delete
);

module.exports = router;
