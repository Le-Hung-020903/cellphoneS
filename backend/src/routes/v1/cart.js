var express = require("express");
var router = express.Router();
const authMiddleware = require("../../middlewares/api/auth.middleware");
const cartController = require("../../controllers/api/v1/cart/cart.controller");
router.get("/v1/cart", authMiddleware, cartController.index);
router.post("/v1/cart", authMiddleware, cartController.add);
router.delete("/v1/cart/:id", authMiddleware, cartController.delete);
module.exports = router;
