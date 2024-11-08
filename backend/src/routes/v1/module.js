var express = require("express");
var router = express.Router();
const moduleController = require("../../controllers/api/v1/module/module.controller");

router.get("/v1/modules", moduleController.index);
router.post("/v1/modules", moduleController.add);
router.patch("/v1/modules/:id", moduleController.update);
module.exports = router;
