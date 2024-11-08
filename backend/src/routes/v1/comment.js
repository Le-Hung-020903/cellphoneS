var express = require("express");
var router = express.Router();
const commentController = require("../../controllers/api/v1/comment/comment.controller");
router.post("/v1/comments", commentController.add);
module.exports = router;
