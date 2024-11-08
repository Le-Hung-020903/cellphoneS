const {
  User,
  Role,
  Blacklist,
  sequelize,
} = require("../../../../models/index");
const { string, object, boolean } = require("yup");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const {
  successResponse,
  errorResponse,
} = require("../../../../utils/response");
const changePasswordSchema = require("../../../../validators/changePassword.validators");

module.exports = {
  index: async (req, res) => {
    const {
      sort = "id",
      order = "asc",
      status,
      q,
      page = 1,
      limit = 3,
    } = req.query;
    let filter = {};

    if (status === "true" || status === "false") {
      filter.status = status === "true";
    }

    if (q) {
      filter[Op.or] = {
        name: {
          [Op.iLike]: `%${q}%`,
        },
        email: {
          [Op.iLike]: `%${q}%`,
        },
      };
    }
    const options = {
      order: [[sort, order]],
      attributes: { exclude: "password" },
      where: filter,
    };
    if (Number.isInteger(+limit) && Number.isInteger(+page)) {
      options.offset = (page - 1) * limit;
      options.limit = limit;
    }
    try {
      const { count, rows: users } = await User.findAndCountAll(options);
      const totalPages = Math.ceil(count / limit);
      return successResponse(res, 200, "Success", users, { count, totalPages });
    } catch (e) {
      return errorResponse(res, 500, e.message);
    }
  },
  find: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }
      return successResponse(res, 200, "Success", user);
    } catch (e) {
      return errorResponse(res, 500, "Server error", e);
    }
  },
  store: async (req, res) => {
    try {
      const schema = object({
        name: string().required("Tên bắt buộc phải nhập"),
        email: string()
          .required("Email bắt buộc phải nhập")
          .email("Email không đúng định dạng")
          .test(
            "Check unique",
            "Email đã tồn tại trên hệ thống",
            async (value) => {
              const user = await User.findOne({
                where: {
                  email: value,
                },
              });
              return !user;
            }
          ),
        password: string().required("Mật khẩu bắt buộc nhập"),
        status: boolean().test(
          "Check status",
          "Trạng thái không hợp lệ",
          async (value) => {
            return value === true || value === false;
          }
        ),
        phone: string().required("Số điện thoại bắt buộc phải nhập"),
      });
      const body = await schema.validate(req.body, {
        abortEarly: false,
      });
      const user = await User.create({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        status: body.status === true,
        phone: body.phone,
        address: body.address,
      });
      return successResponse(res, 201, "Success", { user, req });
    } catch (e) {
      const errors = Object.fromEntries(
        e?.inner?.map(({ path, message }) => [path, message])
      );
      return errorResponse(res, 400, "Bad Request", errors);
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const schema = object({
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .email("Email không đúng định dạng")
        .test(
          "check unique",
          "Email đã tồn tại trên hệ thống",
          async (email) => {
            const user = await findOne({
              where: {
                email: email,
                id: {
                  [Op.ne]: id,
                },
              },
            });
            return !user;
          }
        ),
      password: string().required("Mật khẩu bắt buộc nhập"),
      phone: string().required("Số điện thoại bắt buộc phải nhập"),
    });
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }
      const body = await schema.validate(req.body, {
        abortEarly: false,
      });
      const updateUserData = {};
      if (req.body.name) {
        updateUserData.name = body.name;
      }
      if (req.body.email) {
        updateUserData.email = body.email;
      }
      if (req.body.password) {
        const isMatch = bcrypt.compareSync(body.password, user.password);
        if (!isMatch) {
          updateUserData.password = bcrypt.hashSync(body.password, 10);
        }
      }
      if (req.body.status) {
        updateUserData.status = body.status;
      }
      if (req.body.phone) {
        updateUserData.phone = body.phone;
      }
      if (req.body.address) {
        updateUserData.address = body.address;
      }
      const updateUser = await User.update(updateUserData, {
        where: {
          id: id,
        },
      });
      return successResponse(res, 200, "Success", updateUser);
    } catch (e) {
      const error = Object.fromEntries(
        e.inner.map((item) => {
          return [item.path, item.message];
        })
      );
      return errorResponse(res, 400, "Bad Request", error);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }
      await User.destroy({
        where: {
          id: id,
        },
      });
      return successResponse(res, 200, "Success", "User deleted successfully");
    } catch (err) {
      return errorResponse(res, 500, "Server error");
    }
  },
  getRoles: async (req, res) => {
    try {
      const { id } = req.params;
      const roles = await Role.findAll();
      const user = await User.findOne({
        where: {
          id: id,
        },
        attributes: { exclude: ["password"] },
        include: {
          model: Role,
          as: "roles",
        },
      });
      return successResponse(res, 200, "success", { roles, userRoles: user });
    } catch (e) {
      return errorResponse(res, 500, "Server error", e);
    }
  },
  roles: async (req, res) => {
    try {
      const { id } = req.params;
      let { roles } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }
      if (!roles) {
        roles = [];
      }
      roles = Array.isArray(roles) ? roles : [roles];
      if (user) {
        const rolesInstance = await Promise.all(
          roles.map((valueId) => Role.findByPk(valueId))
        );
        await user.setRoles(rolesInstance);
      }
      const updateRole = await User.findByPk(id, {
        include: {
          model: Role,
          as: "roles",
        },
        attributes: { exclude: "password" },
      });
      return successResponse(res, 200, "Add role successfully", {
        updateRole,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server error", e);
    }
  },
  changePassword: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { id, exp, accessToken } = req.user;
      const user = await User.findByPk(id);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }

      const body = await changePasswordSchema.validate(req.body, {
        abortEarly: false,
      });

      // Kiểm tra mật khẩu hiện tại
      if (!bcrypt.compareSync(body.current_password, user.password)) {
        return errorResponse(res, 400, "Password is incorrect");
      }

      // Cập nhật mật khẩu mới
      const newPassword = bcrypt.hashSync(body.new_password, 10);
      await User.update(
        { password: newPassword },
        { where: { id: id }, transaction }
      );

      // Xóa tất cả refreshToken của user
      await UserToken.destroy({
        where: { user_id: id },
        transaction,
      });

      // Đưa accessToken hiện tại vào Blacklist
      // await
      transaction.commit();

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return successResponse(
        res,
        200,
        "Your password has been successfully updated!"
      );
    } catch (e) {
      await transaction.rollback();
      if (e.name === "ValidationError") {
        const errors = Object.fromEntries(
          e?.inner?.map(({ path, message }) => {
            return [path, message];
          })
        );
        return errorResponse(res, 400, "Validation Error", errors);
      }
      return errorResponse(res, 500, "Server error", e.message);
    }
  },
};
