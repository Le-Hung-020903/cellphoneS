const { Product_review, sequelize } = require("../../../../models/index");
const {
  successResponse,
  errorResponse,
} = require("../../../../utils/response");
const reviewSchema = require("../../../../validators/review.validators");
module.exports = {
  add: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.user;
      if (!id) {
        return errorResponse(res, 401, "Unauthorized");
      }
      const body = await reviewSchema.validate(req.body, {
        abortEarly: false,
      });
      const isConfirmPurchased =
        body.verified_purchase === "delivered" ? true : false;

      const review = await Product_review.create(
        {
          user_id: id,
          product_id: body.product_id,
          order_id: body.order_id,
          rating: body.star,
          review_content: body.review_content,
          url_image: body.url_image,
          verified_purchase: isConfirmPurchased,
        },
        { transaction }
      );
      if (!review) {
        await transaction.rollback();
        return errorResponse(res, 400, "Unable to create product review");
      }
      await transaction.commit();
      return successResponse(res, 200, "Product review created successfully");
    } catch (e) {
      if (e.name === "ValidationError") {
        const errors = Object.fromEntries(
          e?.inner?.map(({ path, message }) => {
            return [path, message];
          })
        );
        return errorResponse(res, 400, "Validation Error", errors);
      }
      return errorResponse(res, 500, "Server Error", e);
    }
  },
};
