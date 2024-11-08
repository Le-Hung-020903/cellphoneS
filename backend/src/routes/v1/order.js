var express = require("express");
var router = express.Router();
const authMiddleware = require("../../middlewares/api/auth.middleware");
const orderController = require("../../controllers/api/v1/order/order.controller");

router.post("/v1/order", authMiddleware, orderController.add);
router.get("/v1/order", authMiddleware, orderController.getLatestOrder);
router.get("/v1/countOrder", authMiddleware, orderController.countOrder);
router.get("/v1/orders", authMiddleware, orderController.getAllOrder);
router.get("/v1/order/:id", authMiddleware, orderController.getDetailOrder);
router.get(
  "/v1/admin/orders",
  authMiddleware,
  orderController.getAllOrdersAdmin
);
router.get(
  "/v1/admin/order/:id",
  authMiddleware,
  orderController.getDetailOrderAdmin
);
module.exports = router;
