const { Discount } = require("../../../../../models/index");
const {
  successResponse,
  errorResponse,
} = require("../../../../../utils/response");
module.exports = {
  index: async (req, res) => {
    try {
      const discount = await Discount.findAll({
        order: [["id", "DESC"]],
      });
      return successResponse(res, 200, "Success", { discount });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  add: async (req, res) => {
    try {
      const { name, code, start, end } = req.body;
      if (!code || !start || !end || !name) {
        return errorResponse(res, 400, "Vui lòng nhập trường");
      }
      const [discount, created] = await Discount.findOrCreate({
        where: {
          name: name,
          discount_code: code,
          start_day: start,
          end_day: end,
        },
        defaults: {
          name: name,
          discount_code: code,
          start_day: start,
          end_day: end,
        },
      });
      if (!created) {
        return errorResponse(res, 409, "Discount already exists");
      }
      return successResponse(res, 201, "Success", discount);
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      let { name, code, start, end } = req.body;
      const discount = await Discount.findByPk(id);
      if (!discount) {
        return errorResponse(res, 404, "Discount not found");
      }
      if (name) {
        discount.name = name;
      }
      if (code) {
        discount.discount_code = code;
      }
      if (start) {
        discount.start_day = start;
      }
      if (end) {
        discount.end_day = end;
      }
      await discount.save();
      return successResponse(res, 200, "Success", discount);
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const discount = await Discount.findByPk(id);
      if (!discount) {
        return errorResponse(res, 404, "Discount not found");
      }
      await discount.destroy();
      return successResponse(res, 200, "Discount deleted successfully");
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
};
