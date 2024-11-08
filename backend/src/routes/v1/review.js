var express = require("express");
var router = express.Router();
const reviewController = require("../../controllers/api/v1/reviews/review.controller");
const authMiddleware = require("../../middlewares/api/auth.middleware");
router.post("/v1/review", authMiddleware, reviewController.add);
module.exports = router;
