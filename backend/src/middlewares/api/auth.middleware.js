const { User, Blacklist } = require("../../models/index");
const { verifyToken } = require("../../utils/jwt");
const { errorResponse } = require("../../utils/response");
module.exports = async (req, res, next) => {
  // xác thực người dùng
  // const accessToken = req.get("Authorization")?.split(" ").slice(-1).join();
  const accessToken =
    req.cookies.accessToken || req.get("Authorization")?.split(" ")[1];

  // tìm xem token này có nằm trong bl hay không
  const black_lists = await Blacklist.findOne({
    where: {
      token: accessToken ?? "",
    },
  });
  // ==> nếu có  return luôn
  if (black_lists) {
    return errorResponse(res, 401, "Unauthorized");
  }

  // Giải mã tokens
  const decoded = verifyToken(accessToken);
  if (!decoded) {
    return errorResponse(res, 401, "Unauthorized khong dược");
  }
  const { userId, exp } = decoded;

  // Xác nhận hệ thống còn người dùng hay không ?
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return errorResponse(res, 401, "Unauthorized");
  }

  // Gán accessToken, exp, và dữ liệu vào request
  const { id, name, avatarUrl, phone, email } = user.dataValues;
  req.user = {
    accessToken,
    exp,
    id,
    name,
    avatarUrl,
    phone,
    email,
  };
  return next();
};
