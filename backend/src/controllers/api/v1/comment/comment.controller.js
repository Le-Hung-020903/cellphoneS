const { Comment } = require("../../../../models/index");
const {
  successResponse,
  errorResponse,
} = require("../../../../utils/response");
module.exports = {
  add: async (req, res) => {
    try {
      const { user_id } = req.user;
      const { content, product_id, parent_comment } = req.body;
      if (content.trim().length < 20) {
        return errorResponse(
          res,
          400,
          "Your comment is too short. Please re-enter"
        );
      }
      if (!user_id) {
        return errorResponse(res, 401, "Unauthorized");
      }
      return successResponse(
        res,
        200,
        "You have successfully posted your comment"
      );
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
};
