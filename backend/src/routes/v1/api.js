var express = require("express");
var router = express.Router();
const authMiddleware = require("../../middlewares/api/auth.middleware");
const userController = require("../../controllers/api/v1/users/user.controller");
const authController = require("../../controllers/api/v1/auth/auth.controller");
const roleController = require("../../controllers/api/v1/roles/role.controller");
const permissions = require("../../middlewares/api/permission.middleware");

// ------- USER -------
router.get(
  "/v1/users",
  authMiddleware,
  permissions("users.read"),
  userController.index
);

router.get("/v1/users/:id", userController.find);
router.post(
  "/v1/users",
  authMiddleware,
  permissions("users.insert"),
  userController.store
);
router.patch(
  "/v1/users/:id",
  authMiddleware,
  permissions("users.update"),
  userController.update
);

router.delete(
  "/v1/users/:id",
  authMiddleware,
  permissions("users.delete"),
  userController.delete
);

router.get("/v1/users/roles/:id", userController.getRoles);
router.post(
  "/v1/users/roles/:id",
  authMiddleware,
  permissions("decentralization.insert"),
  userController.roles
);

router.post(
  "/v1/users/changePassword",
  authMiddleware,
  userController.changePassword
);

// ------- AUTH -------
router.post("/v1/auth/login", authController.login);
router.get("/v1/auth/profile", authMiddleware, authController.profile);
router.post("/v1/auth/logout", authMiddleware, authController.logout);
router.post("/v1/auth/refresh", authController.refresh);

// ------- ROLES -------
router.get(
  "/v1/roles",
  authMiddleware,
  permissions("roles.read"),
  roleController.index
);
router.post(
  "/v1/roles",
  authMiddleware,
  permissions("roles.insert"),
  roleController.add
);
router.get("/v1/roles/:id", roleController.find);
router.patch(
  "/v1/roles/:id",
  authMiddleware,
  permissions("roles.update"),
  roleController.update
);
router.delete(
  "/v1/roles/:id",
  authMiddleware,
  permissions("roles.delete"),
  roleController.delete
);

module.exports = router;
