const { JWT_SECRET, JWT_ACCESS_TOKEN_EXPIRE, JWT_REFRESH_TOKEN_EXPIRE } =
  process.env;
const jwt = require("jsonwebtoken");
module.exports = {
  createAccessToken: (data = {}) => {
    try {
      return jwt.sign(data, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRE,
      });
    } catch {
      return false;
    }
  },
  createRefreshToken: () => {
    try {
      return jwt.sign(
        { value: Math.random() + new Date().getTime() },
        JWT_SECRET,
        {
          expiresIn: JWT_REFRESH_TOKEN_EXPIRE,
        }
      );
    } catch {
      return false;
    }
  },
  verifyToken: (token) => {
    try {
      return jwt.decode(token, JWT_SECRET);
    } catch {
      return false;
    }
  },
};
