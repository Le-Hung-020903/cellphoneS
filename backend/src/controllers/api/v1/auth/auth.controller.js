const { JWT_ACCESS_TOKEN_EXPIRE, JWT_REFRESH_TOKEN_EXPIRE } = process.env;
const {
  User,
  UserToken,
  Role,
  Blacklist,
  Permission,
  sequelize,
} = require("../../../../models/index");
const {
  successResponse,
  errorResponse,
} = require("../../../../utils/response");
const {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} = require("../../../../utils/jwt");
const bcrypt = require("bcrypt");
module.exports = {
  login: async (req, res) => {
    //1. validate
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(
        res,
        400,
        "Bad Request",
        "Vui lòng nhập email hoặc password"
      );
    }
    //2. Kiểm tra email có tồn tại hay không
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return errorResponse(res, 400, "Bad request", {
        email: "Email không tồn tại trên hệ thống",
      });
    }
    //3. Lấy password hash, và so sánh với password từ body
    const { password: hash } = user;
    if (!bcrypt.compareSync(password, hash)) {
      return errorResponse(res, 400, "Bad request", {
        password: "Mật khẩu không chính xác",
      });
    }
    //4. Tạo token bằng jwt
    const accessToken = createAccessToken({ userId: user.id });
    const refreshToken = createRefreshToken();
    if (!accessToken) {
      return errorResponse(res, 500, "Server error");
    }
    if (!refreshToken) {
      return errorResponse(res, 500, "Server error");
    }

    // Lưu refreshToken vào db
    await UserToken.create({
      refresh_token: refreshToken,
      user_id: user.id,
    });

    // 5. lưu cả hai accessToken và Refresh token vào cookie và trả về
    const accessTokenTime = parseInt(JWT_ACCESS_TOKEN_EXPIRE);
    const refreshTokenTime = parseInt(JWT_REFRESH_TOKEN_EXPIRE);

    const accessTokenMaxAge = accessTokenTime * 60 * 60 * 1000;
    const refreshTokenMaxAge = refreshTokenTime * 60 * 60 * 1000;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: accessTokenMaxAge,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: refreshTokenMaxAge,
    });
    return successResponse(res, 200, "Success");
  },
  profile: async (req, res) => {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id, {
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
      const permissions = [];
      if (user.roles.length) {
        user.roles.forEach((role) => {
          role.permissions?.forEach((permission) => {
            !permissions.includes(permission.value) &&
              permissions.push(permission.value);
          });
        });
      }

      const data = {
        ...req.user,
        permissions: permissions,
      };
      return successResponse(res, 200, "Success", data);
    } catch (e) {
      return errorResponse(res, 500, "Server error", e.message);
    }
  },
  logout: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const refresh_token = req.cookies.refreshToken;
      const { accessToken, exp, id } = req.user;
      const back_list = await Blacklist.create(
        {
          token: accessToken,
          expired: exp,
        },
        { transaction }
      );
      if (!back_list) {
        await transaction.rollback();
        return errorResponse(res, 500, "Unable to add to blacklist");
      }
      const user_token = await UserToken.destroy(
        {
          where: {
            user_id: id,
            refresh_token: refresh_token,
          },
        },
        { transaction }
      );
      if (!user_token) {
        await transaction.rollback();
        return errorResponse(res, 500, "Unable to delete userToken");
      }
      await transaction.commit();
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return successResponse(res, 200, "Logged out successfully");
    } catch (e) {
      await transaction.rollback();
      return errorResponse(res, 500, "Server error", e.message);
    }
  },
  refresh: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      // Lấy refreshToken từ cookies
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return errorResponse(res, 400, "Refresh token missing");
      }
      console.log(`REFRESH TOKEN: ${refreshToken}`);

      // Verify refreshToken trước khi tìm trong DB
      const decoded = verifyToken(refreshToken);
      if (!decoded) {
        return errorResponse(res, 401, "Unauthorized");
      }

      // Kiểm tra sự tồn tại của refreshToken trong DB
      const userToken = await UserToken.findOne({
        where: {
          refresh_token: refreshToken,
        },
      });
      if (!userToken) {
        return errorResponse(res, 400, "Invalid refresh token");
      }

      //Nếu tồn tại trong db --> lấy ra userId
      const { user_id: userId } = userToken;

      // khởi tạo accessToken và refresh mới
      const accessToken = createAccessToken({ userId });
      const newRefreshToken = createRefreshToken();
      if (!accessToken || !newRefreshToken) {
        return errorResponse(res, 500, "Server error");
      }
      userToken.refresh_token = newRefreshToken;
      await userToken.save({ transaction });
      await transaction.commit();

      // Xóa refreshToken cũ khỏi cookies và thêm token mới
      res.clearCookie("refreshToken");
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: parseInt(JWT_REFRESH_TOKEN_EXPIRE) * 60 * 60 * 1000,
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: parseInt(JWT_ACCESS_TOKEN_EXPIRE) * 60 * 60 * 1000,
      });
      return successResponse(res, 200, "Success");
    } catch (e) {
      await transaction.rollback();
      return errorResponse(res, 500, "Server error", e.message);
    }
  },
};
