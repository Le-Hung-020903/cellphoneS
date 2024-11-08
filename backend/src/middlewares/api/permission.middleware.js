const { User, Role, Permission } = require("../../models/index");
const { errorResponse } = require("../../utils/response");
module.exports = (value) => {
  return async (req, res, next) => {
    //Lấy ra danh sách quyền user đang đăng nhập
    const userId = req.user.id;

    if (!userId) {
      return errorResponse(res, 401, "Unauthorized");
    }

    const user = await User.findByPk(userId, {
      include: {
        model: Role,
        as: "roles",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
        include: {
          model: Permission,
          as: "permissions",
          attributes: ["id", "value"],
          through: {
            attributes: [],
          },
        },
      },
    });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    const permissions = []; // dùng để chứa các permission cả user đang đăng nhập
    if (user.roles.length) {
      user.roles.forEach((role) => {
        role.permissions?.forEach((permission) => {
          !permissions.includes(permission.value) &&
            permissions.push(permission.value);
        });
      });
    }

    // Kiểm tra quyền
    if (!permissions.includes(value)) {
      return errorResponse(res, 403, "You don't have permission");
    }
    return next();
  };
};
