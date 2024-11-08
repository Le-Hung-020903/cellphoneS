const { Role, Permission, User } = require("../../../../models/index");
const {
  successResponse,
  errorResponse,
} = require("../../../../utils/response");
module.exports = {
  index: async (req, res) => {
    try {
      const role = await Role.findAll({
        order: [["id", "desc"]],
      });
      return successResponse(res, 200, "Success", { role });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  add: async (req, res) => {
    try {
      let { name, permissions } = req.body;
      if (!name) {
        return errorResponse(res, 400, "name is required");
      }
      if (!permissions) {
        permissions = [];
      }
      permissions = Array.isArray(permissions) ? permissions : [permissions];
      const [role] = await Role.findOrCreate({
        where: {
          name: name,
        },
        defaults: {
          name: name,
        },
      });
      if (!role) {
        return errorResponse(res, 500, "Server Error", e);
      }
      if (role && permissions.length) {
        const permissionsInstance = await Promise.all(
          permissions.map(async (value) => {
            const [permissionInstance] = await Permission.findOrCreate({
              where: {
                value: value.trim(),
              },
              defaults: {
                value: value.trim(),
              },
            });
            return permissionInstance;
          })
        );

        //Thêm permission vào bảng: roles_permissions
        await role.addPermissions(permissionsInstance);
      }
      return successResponse(res, 200, "Success", { role, permissions });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  find: async (req, res) => {
    try {
      const { id } = req.params;
      const role = await Role.findByPk(id, {
        include: {
          model: Permission,
          as: "permissions",
        },
      });
      if (!role) {
        return errorResponse(res, 404, "Role not found");
      }
      return successResponse(res, 200, "Success", role);
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      let { name, permissions } = req.body;
      if (!name) {
        return errorResponse(res, 400, "name is required");
      }
      if (!permissions) {
        permissions = [];
      }
      permissions = Array.isArray(permissions) ? permissions : [permissions];

      const role = await Role.findByPk(id);
      if (!role) {
        return errorResponse(res, 404, "Role not found");
      }
      await Role.update({ name }, { where: { id } });

      if (role && permissions.length) {
        const permissionsInstance = await Promise.all(
          permissions.map(async (value) => {
            const [permissionInstance] = await Permission.findOrCreate({
              where: {
                value: value.trim(),
              },
              defaults: {
                value: value.trim(),
              },
            });

            return permissionInstance;
          })
        );

        //Thêm permission vào bảng: roles_permissions
        await role.setPermissions(permissionsInstance);
      }
      const updateRole = await Role.findByPk(id, {
        include: {
          model: Permission,
          as: "permissions",
          attributes: ["id", "value"],
          through: {
            attributes: [], // Không lấy bất kỳ thuộc tính nào từ bảng trung gian
          },
        },
      });
      return successResponse(res, 200, "Role update successfully", {
        role: updateRole,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const role = await Role.findByPk(id, {
        include: [
          { model: Permission, as: "permissions" },
          {
            model: User,
            as: "users",
          },
        ],
      });
      await role.removePermissions(role.permissions);
      await role.removeUsers(role.users);
      await role.destroy();
      return successResponse(res, 200, "Delete permissions successfully");
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
};
